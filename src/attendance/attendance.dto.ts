import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({
    example: 'ORD123456',
    description: 'Código do pedido associado à assistência',
  })
  @IsString()
  code_order: string;

  @ApiProperty({
    example: 1,
    enum: [1, 2, 3],
    description:
      'Status da assistência (1 - Em rota, 2 - Entregue, 3 - Cancelado)',
  })
  @IsEnum([1, 2, 3])
  status: number; // 1 - Em rota | 2 - Entregue | 3 - Cancelado

  @ApiProperty({
    example: 'Cartão de Crédito',
    description: 'Método de pagamento utilizado para a assistência',
  })
  @IsString()
  payment_method: string;

  @ApiProperty({
    example: 15.5,
    description: 'Taxa de entrega associada',
  })
  @IsNumber()
  tax_delivery: number;

  @ApiProperty({
    example: 101,
    description: 'ID da entrega associada',
  })
  @IsNumber()
  deliveryId: number; // ID do delivery

  @ApiProperty({
    example: 5,
    description: 'ID do escritório associado à assistência',
  })
  @IsNumber()
  officeId: number; // ID do office
}

export class UpdateAttendanceDto {
  @ApiProperty({
    example: 2,
    enum: [1, 2, 3],
    description:
      'Novo status da assistência (1 - Em rota, 2 - Entregue, 3 - Cancelado)',
    required: false,
  })
  @IsOptional()
  @IsEnum([1, 2, 3])
  status?: number; // 1 - Em rota | 2 - Entregue | 3 - Cancelado
}
