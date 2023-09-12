import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { Login } from '../admin/entities/logins.entity';
import { AdminService } from '../admin/admin.service';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Login]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminService, LocalStrategy],
})
export class AuthModule {}
