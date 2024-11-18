import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do entregador',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '555-1234',
    description: 'Número de telefone do destinatário',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 25,
    description: 'Valor diário referente ao serviço de entrega',
  })
  @IsNumber()
  diary_value: number;
}

export class UpdateDeliveryDto {
  @ApiProperty({
    example: 'Jane Doe',
    description: 'Nome atualizado do entregadora',
    required: false, // O campo é opcional
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '555-6789',
    description: 'Número de telefone atualizado do destinatário',
    required: false, // O campo é opcional
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 30.0,
    description: 'Novo valor diário referente ao serviço de entrega',
    required: false, // O campo é opcional
  })
  @IsOptional()
  @IsNumber()
  diary_value?: number;
}
