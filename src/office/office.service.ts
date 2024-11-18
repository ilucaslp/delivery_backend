import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Or, Repository } from 'typeorm';
import { Office } from './office.entity'; // Certifique-se de ajustar o caminho para a entidade Office
import { UpdateOfficeDto } from './office.dto';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) {}

  // Read - Listar todos os registros de Office
  async getOffice(): Promise<Office> {
    let office = await this.officeRepository.findOne({
      where: {
        opened: 2,
      },
    });
    if (!office) {
      office = await this.officeRepository.findOne({
        where: {
          opened: 1,
        },
      });
      if (!office) {
        const lastOffice = await this.officeRepository.findOne({
          where: {
            opened: 3,
          },
          order: {
            id: 'DESC',
          },
        });
        const newOffice = await this.officeRepository.create({
          opened: 1,
          price_tax_default: lastOffice ? lastOffice.price_tax_default : 4,
        });
        return await this.officeRepository.save(newOffice);
      }
    }
    return office;
  }

  async getOffices(): Promise<Office[]> {
    const offices = await this.officeRepository.find({
      withDeleted: true,
      relations: {
        attendances: {
          delivery: true,
        },
      },
      order: {
        id: 'DESC',
      },
    });
    return offices;
  }

  async getOfficeById(id: number): Promise<Office> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
    return office;
  }

  // Update - Atualizar um registro de Office
  async updateOffice(id: number, updateData: UpdateOfficeDto): Promise<Office> {
    const office = await this.getOfficeById(id);
    if (office.opened === 3) {
      throw new InternalServerErrorException(
        'Não é possivel atualizar um expediente fechado!',
      );
    }
    Object.assign(office, updateData);
    if (updateData.opened === 3) {
      office.closed_at = new Date();
      await this.officeRepository.save(office);
      return await this.getOffice();
    } else {
      if (updateData.opened === 2) {
        office.opened_at = new Date();
      }
      const savedData = await this.officeRepository.save(office);
      return savedData;
    }
  }
}
