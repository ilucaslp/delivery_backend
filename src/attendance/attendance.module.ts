import { Module, NestModule } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { DeliveriesModule } from 'src/delivery/delivery.module';
import { OfficeModule } from 'src/office/office.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    DeliveriesModule,
    OfficeModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {
  configure() {}
}
