import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto } from './attendance.dto';
import { Attendance } from './attendance.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('attendances') // Agrupa as operações deste controlador na seção "attendances" no Swagger
@ApiBearerAuth() // Indica que a autenticação via Bearer Token é necessária para acessar os endpoints
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get(':office_id')
  @ApiOperation({ summary: 'Listar todas as assistências de um escritório' })
  @ApiParam({
    name: 'office_id',
    description: 'ID do escritório para listar as assistências',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de assistências retornada com sucesso.',
    type: [Attendance],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Token necessário.',
  })
  async getAll(@Param('office_id') office_id: number): Promise<Attendance[]> {
    return this.attendanceService.getAttendances(office_id);
  }

  @Post(':office_id')
  @ApiOperation({ summary: 'Criar uma nova assistência' })
  @ApiParam({
    name: 'office_id',
    description: 'ID do escritório para associar a nova assistência',
    type: Number,
  })
  @ApiBody({
    type: CreateAttendanceDto,
    description: 'Dados necessários para criar uma nova assistência',
  })
  @ApiResponse({
    status: 201,
    description: 'Assistência criada com sucesso.',
    type: Attendance,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Token necessário.',
  })
  async create(
    @Param('office_id') office_id: number,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Put(':office_id/:id')
  @ApiOperation({ summary: 'Atualizar uma assistência existente' })
  @ApiParam({
    name: 'office_id',
    description: 'ID do escritório ao qual a assistência pertence',
    type: Number,
  })
  @ApiParam({
    name: 'id',
    description: 'ID da assistência a ser atualizada',
    type: Number,
  })
  @ApiBody({
    type: UpdateAttendanceDto,
    description: 'Dados necessários para atualizar a assistência',
  })
  @ApiResponse({
    status: 200,
    description: 'Assistência atualizada com sucesso.',
    type: Attendance,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiResponse({ status: 404, description: 'Assistência não encontrada.' })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Token necessário.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.updateAttendance(id, updateAttendanceDto);
  }
}
