import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], user: User) {
    return roles.some((role) => {
      if (role === 'STUDENT' && user.student) return true;
      if (role === 'TEACHER' && user.teacher) return true;
      return false;
    });
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    return this.matchRoles(roles, user);
  }
}
