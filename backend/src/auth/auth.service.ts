import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'hr' | 'manager';
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.debug(`Validating user: ${username}`);
    
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      this.logger.warn(`User not found: ${username}`);
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      this.logger.log(`User validated successfully: ${username}`);
      const { password, ...result } = user;
      return result;
    } else {
      this.logger.warn(`Invalid password for user: ${username}`);
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    this.logger.log(`Login attempt for user: ${loginDto.username}`);
    
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      this.logger.warn(`Login failed for user: ${loginDto.username} - Invalid credentials`);
      throw new UnauthorizedException('用户名或密码错误');
    }
    
    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    
    this.logger.log(`User logged in successfully: ${loginDto.username} (Role: ${user.role})`);
    this.logger.debug(`Generated JWT token for user: ${loginDto.username}`);
    
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    this.logger.log(`Registration attempt for user: ${registerDto.username}`);
    
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      this.logger.debug(`Password hashed for user: ${registerDto.username}`);
      
      const user = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });
      
      this.logger.log(`User registered successfully: ${registerDto.username} (Role: ${registerDto.role})`);
      
      const { password, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error(`Registration failed for user: ${registerDto.username}`, error.stack);
      throw error;
    }
  }
}