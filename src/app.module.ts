import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { DeliveriesModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance/attendance.entity';
import { Delivery } from './delivery/delivery.entity';
import { OfficeModule } from './office/office.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Office } from './office/office.entity';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Attendance, Delivery, Office, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AttendanceModule,
    DeliveriesModule,
    OfficeModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
