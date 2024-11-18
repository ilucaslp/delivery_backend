import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateOfficeDto {
  @IsEnum([1, 2, 3], {
    message:
      'O valor precisa ser um destes: 1 (Em espera), 2 (Aberto), or 3 (Fechado)',
  })
  @ApiProperty({
    example: 1,
    description: 'Em espera',
  })
  @IsOptional()
  opened: number; // 1 - Em espera | 2 - Aberto | 3 - Fechado


  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1.99,
    description: 'Preço padrão do expediente',
  })
  price_tax_default: number
  
}
