import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserType } from 'src/utils/enum';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Ensure user exists and has a userType
    if (!user || !user.userType) {
      throw new ForbiddenException('User does not have any assigned roles');
    }

    const hasRequiredRole = requiredRoles.some(role => user.userType === role);

    if (!hasRequiredRole) {
      throw new ForbiddenException(`User with role ${user.userType} does not have permission to access this resource`);
    }

    return true;
  }
}