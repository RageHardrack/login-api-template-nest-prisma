import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import { CommonModule } from 'src/common/common.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ConfigModule, PrismaModule, CommonModule],
  exports: [],
})
export class UserModule {}
