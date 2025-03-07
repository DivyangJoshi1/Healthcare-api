import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
type Role = 'ADMIN' | 'PATIENT' | 'DOCTOR';
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // 🔹 Register a new user
  async register(createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;

    // ✅ Ensure required fields are provided
    if (!username || !email || !password) {
      throw new BadRequestException('Username, email, and password are required');
    }

    // ✅ Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // 🔐 Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Ensure role is assigned correctly
    const userRole: Role = role ? role : 'PATIENT';



    // ✅ Create a new user in the database
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: userRole,
      },
      select: {  // ✅ Exclude the password from the response
        id: true,
        username: true,
        email: true,
        role: true,
      }
    });
  
    return { message: 'User registered successfully', user };
  }

  // 🔹 Validate user credentials for login
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { accessToken: this.generateToken(user) };
  }

  // 🔹 Generate JWT token for authentication
  generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  }
  
  
}