import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Public } from 'src/auth/public.decorator';
import { CreateUserDto } from './user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users') // Agrupa as operações em uma seção "users" no Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criar um novo usuário' }) // Descrição breve da operação
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: User,
  }) // Resposta de sucesso
  @ApiResponse({
    status: 400,
    description: 'A senha precisa ter mais que 6 digitos',
  }) // Possível erro de requisição
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados necessários para criar um novo usuário',
  }) // Descreve o corpo da requisição
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }
}
