import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // Implementing the canActivate method for role validation
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Step 1: Get roles metadata from the route handler
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No roles required, allow access
    }

    // Step 2: Get user from the request, which is set by JwtAuthGuard
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Step 3: Check if the user has the required role
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException('Access denied: You do not have the required role');
    }

    return true; // User is authorized
  }
}
