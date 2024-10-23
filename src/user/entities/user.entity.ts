import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  async valdatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
