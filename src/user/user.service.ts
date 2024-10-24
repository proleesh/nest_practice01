import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, nickname: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      nickname,
    });
    return this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('아이디또는 패스워드 오류');
    }
    const { password: _, ...result } = user;
    return result;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      nickname: user.nickname,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
