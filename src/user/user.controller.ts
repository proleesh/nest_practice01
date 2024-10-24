import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string; nickname: string },
  ) {
    return this.userService.register(
      body.username,
      body.password,
      body.nickname,
    );
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(
      body.username,
      body.password,
    );
    return this.userService.login(user);
  }
}
