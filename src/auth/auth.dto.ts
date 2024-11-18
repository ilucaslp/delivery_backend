import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Nome de usuário usado para login',
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
