import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { LoginDto } from './auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth') // Agrupa os endpoints deste controlador na seção "auth" do Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário e gerar um token JWT' }) // Descrição do endpoint
  @ApiBody({
    type: LoginDto,
    description: 'Dados necessários para autenticar o usuário',
  }) // Documentação do corpo da requisição
  @ApiResponse({
    status: 200,
    description: 'Autenticado com sucesso. Retorna o token de acesso.',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obl9kb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.tKN5J2WbOgNSDlfA67mN-dBSIErfNX8JwosBB5b4Fcw',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas. Autenticação falhou.',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
