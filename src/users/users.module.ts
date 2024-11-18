import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra a entidade User
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Para ser usado no módulo de autenticação
})
export class UsersModule {}
