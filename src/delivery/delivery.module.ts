import { Module } from '@nestjs/common';
import { DeliveriesController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';
import { DeliveriesService } from './delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
