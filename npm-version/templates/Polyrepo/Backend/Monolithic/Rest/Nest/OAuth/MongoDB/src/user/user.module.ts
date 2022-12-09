import { Module } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './utils/Serializer';
import { GoogleStrategy } from './utils/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService,
    GoogleStrategy,
    SessionSerializer]
})
export class UserModule {}
