import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInfo } from './entities/userInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { UpdateUserInfo } from './dto/update-userInfo.input';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async create(): Promise<UserInfo> {
    const newUserInfo = this.userInfoRepository.create();

    return this.userInfoRepository.save(newUserInfo);
  }

  findOne(id: number) {
    return this.userInfoRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserInfo: UpdateUserInfo) {
    const userInfo = await this.findOne(id);
    if (!userInfo) {
      throw new Error('User info not exsist');
    }

    if (updateUserInfo.image) {
      const { createReadStream, filename } = await updateUserInfo.image;
      return new Promise(async (resolve) => {
        createReadStream()
          .pipe(
            createWriteStream(
              join(
                process.cwd(),
                `./${process.env.UPLOADS_DIR}/${Date.now()}_${filename}`,
              ),
            ),
          )
          .on('finish', async () => {
            return await this.userInfoRepository
              .update(id, {
                ...updateUserInfo,
                image: `${Date.now()}_${filename}`,
              })
              .then(async () => {
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
