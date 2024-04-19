import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
      PassportModule,
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: 'marko123',
        signOptions: {expiresIn: '5h'}
      })],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy]
})
export class AuthModule {}
