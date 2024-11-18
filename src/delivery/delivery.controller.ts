import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Delivery } from './delivery.entity';
import { DeliveriesService } from './delivery.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateDeliveryDto, UpdateDeliveryDto } from './delivery.dto';

@ApiTags('deliveries') // Agrupa as operações deste controlador na seção "deliveries" do Swagger
@ApiBearerAuth() // Adiciona suporte a autenticação JWT para todos os endpoints deste controlador
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  // Listar todos os registros de Delivery
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de entregadores' }) // Breve descrição da operação
  @ApiResponse({
    status: 200,
    description: 'Lista de entregadores retornada com sucesso.',
    type: [Delivery],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async getAllDeliveries(): Promise<Delivery[]> {
    return this.deliveriesService.getDeliveries();
  }

  // Buscar um único registro de Delivery pelo ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro de entregador pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de entregador',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Registro de entregador encontrado com sucesso.',
    type: Delivery,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro de entregador não encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async getDeliveryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Delivery> {
    return this.deliveriesService.getDeliveryById(id);
  }

  // Criar um novo registro de Delivery
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de entregador' })
  @ApiBody({
    type: CreateDeliveryDto,
    description: 'Dados necessários para criar um novo registro de entregador',
  })
  @ApiResponse({
    status: 201,
    description: 'Registro de entregador criado com sucesso.',
    type: Delivery,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async createDelivery(
    @Body() createDeliveryDto: CreateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveriesService.createDelivery(createDeliveryDto);
  }

  // Atualizar um registro de Delivery
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um registro de entregador existente' })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de entregador a ser atualizado',
    type: Number,
  })
  @ApiBody({
    type: UpdateDeliveryDto,
    description: 'Dados necessários para atualizar um registro de entregador',
  })
  @ApiResponse({
    status: 200,
    description: 'Registro de entregador atualizado com sucesso.',
    type: Delivery,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiResponse({
    status: 404,
    description: 'Registro de entregador não encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async updateDelivery(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveriesService.updateDelivery(id, updateDeliveryDto);
  }

  // Remover um registro de Delivery
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um registro de entregador existente' })
  @ApiParam({
    name: 'id',
    description: 'ID do registro de entregador a ser removido',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Registro de entregador removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro de entregador não encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. O token de autenticação é necessário.',
  })
  async deleteDelivery(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deliveriesService.deleteDelivery(id);
  }
}
