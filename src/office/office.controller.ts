import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from './office.entity';
import { UpdateOfficeDto } from './office.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('office') // Agrupa as operações em uma seção "office" no Swagger
@ApiBearerAuth() // Indica que a autenticação Bearer Token é necessária para acessar os endpoints deste controlador
@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Obter todas as informações do expediente' }) // Descrição da operação
  @ApiResponse({
    status: 200,
    description: 'Dados do expediente retornados com sucesso.',
    type: Array<Office>,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async getAll(): Promise<Office[]> {
    return this.officeService.getOffices();
  }

  
  @Get()
  @ApiOperation({ summary: 'Obter as informações do expediente' }) // Descrição da operação
  @ApiResponse({
    status: 200,
    description: 'Dados do expediente retornados com sucesso.',
    type: Office,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async getOne(): Promise<Office> {
    return this.officeService.getOffice();
  }


  @Put(':id')
  @ApiOperation({ summary: 'Atualizar informações do expediente' }) // Descrição da operação
  @ApiParam({ name: 'id', description: 'ID do expediente a ser atualizado' }) // Documentação do parâmetro ID
  @ApiBody({
    type: UpdateOfficeDto,
    description: 'Dados necessários para atualizar o expediente',
  }) // Documentação do corpo da requisição
  @ApiResponse({
    status: 200,
    description: 'Dados do expediente atualizados com sucesso.',
    type: Office,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateOfficeDto: UpdateOfficeDto,
  ): Promise<Office> {
    return this.officeService.updateOffice(id, updateOfficeDto);
  }
}
