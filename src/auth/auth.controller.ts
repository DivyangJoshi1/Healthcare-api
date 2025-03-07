import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from './role.guard';
import { SetRoles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout() {
    return { message: 'Logout successful' };
  }

  @Post('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)  // Use both guards
  @SetRoles('ADMIN')  // Only Admins can access
  async adminOnlyAction() {
    return { message: 'This is an admin-only action.' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // Protects this route with JWT
  getProfile(@Req() req) {
    console.log('Decoded JWT user:', req.user); // Debugging
    return {
      userId: req.user.sub,
      email: req.user.email,
      username: req.user.username, // This should not be undefined
      role: req.user.role,
    };
  }
}
