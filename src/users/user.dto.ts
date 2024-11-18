import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Nome de usuário único',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Senha do usuário',
  })
  @IsString()
  password: string;
}
