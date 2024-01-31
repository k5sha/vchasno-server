import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInfo } from './entities/userInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createWriteStream } from 'fs';
import { join, extname } from 'path';
import { UpdateUserInfo } from './dto/update-userInfo.input';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { CreateUserInfo } from './dto/create-userInfo.input';
@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async create(createUserInfo: CreateUserInfo): Promise<UserInfo> {
    const newUserInfo = this.userInfoRepository.create(createUserInfo);

    return this.userInfoRepository.save(newUserInfo);
  }

  findOne(id: number) {
    return this.userInfoRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserInfo: UpdateUserInfo) {
    if (!id) {
      throw new Error('User info not exsist');
    }
    const userInfo = await this.findOne(id);
    if (!userInfo) {
      throw new Error('User info not exsist');
    }

    if (updateUserInfo.image) {
      const { createReadStream, filename } = await updateUserInfo.image;
      const new_filename = `${uuidv4()}${extname(filename)}`;
      return new Promise(async (resolve) => {
        createReadStream()
          .pipe(
            createWriteStream(
              join(
                process.cwd(),
                `./${process.env.UPLOADS_DIR}/${new_filename}`,
              ),
            ),
          )
          .on('finish', async () => {
            return await this.userInfoRepository
              .update(id, {
                ...updateUserInfo,
                image: new_filename,
              })
              .then(async () => {
                if (userInfo.image != 'default-avatar.png')
                  fs.rm(
                    join(
                      process.cwd(),
                      `./${process.env.UPLOADS_DIR}/${userInfo.image}`,
                    ),
                    function (err) {
                      if (err) return console.log(err);
                    },
                  );
                resolve(await this.findOne(id));
              });
          })
          .on('error', () => {
            new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
          });
      });
    }
    return await this.userInfoRepository
      .update(id, {
        ...updateUserInfo,
        image: userInfo.image,
      })
      .then(async () => {
        return await this.findOne(id);
      });
  }

  remove(id: number) {
    return this.userInfoRepository.delete(id);
  }
}
