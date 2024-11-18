import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity'; // Assumindo que sua entidade esteja em um arquivo chamado attendance.entity.ts
import { CreateAttendanceDto, UpdateAttendanceDto } from './attendance.dto';
import { DeliveriesService } from 'src/delivery/delivery.service';
import { OfficeService } from 'src/office/office.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private deliveryService: DeliveriesService,
    private officeService: OfficeService,
  ) {}

  // Create - Criar um novo registro de Attendance
  async createAttendance(
    attendanceData: CreateAttendanceDto,
  ): Promise<Attendance> {
    const attendance = this.attendanceRepository.create(attendanceData);
    attendance.delivery = await this.deliveryService.getDeliveryById(
      attendanceData.deliveryId,
    );
    attendance.office = await this.officeService.getOfficeById(
      attendanceData.officeId,
    );
    if (attendance.office.opened !== 2) {
      throw new InternalServerErrorException(
        'Não é possivel adicionar um acompanhamento a um expediente que não está aberto',
      );
    }
    return this.attendanceRepository.save(attendance);
  }

  // Read - Listar todos os registros de Attendance
  async getAttendances(officeId: number): Promise<Attendance[]> {
    const attendances = await this.attendanceRepository.find({
      where: {
        office: {
          id: officeId,
        },
      },
      order: {
        status: 'ASC',
      },
      relations: {
        delivery: true,
      },
    });
    return attendances
  }

  // Read - Buscar um único registro de Attendance pelo ID
  async getAttendanceById(office_id: number, id: number): Promise<Attendance> {
    return this.attendanceRepository.findOne({
      where: {
        id,
        office: {
          id: office_id,
        },
      },
    });
  }

  // Update - Atualizar um registro de Attendance
  async updateAttendance(
    id: number,
    updateData: UpdateAttendanceDto,
  ): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
    });
    if (!attendance) {
      throw new Error(`Attendance with ID ${id} not found`);
    }

    Object.assign(attendance, updateData);
    return this.attendanceRepository.save(attendance);
  }
}
