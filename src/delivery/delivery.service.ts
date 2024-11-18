import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './delivery.entity';
import { CreateDeliveryDto, UpdateDeliveryDto } from './delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) {}

  // Create - Criar um novo registro de Delivery
  async createDelivery(deliveryData: CreateDeliveryDto): Promise<Delivery> {
    const delivery = this.deliveryRepository.create(deliveryData);
    return this.deliveryRepository.save(delivery);
  }

  // Read - Listar todos os registros de Delivery
  async getDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.find();
  }

  // Read - Buscar um único registro de Delivery pelo ID
  async getDeliveryById(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  // Update - Atualizar um registro de Delivery
  async updateDelivery(
    id: number,
    updateData: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.getDeliveryById(id); // Utilizando o método para buscar o registro e garantir que ele existe
    Object.assign(delivery, updateData);
    return this.deliveryRepository.save(delivery);
  }

  // Delete - Remover um registro de Delivery
  async deleteDelivery(id: number): Promise<void> {
    await this.getDeliveryById(id); // Utilizando o método para buscar o registro e garantir que ele existe
    await this.deliveryRepository.softDelete({
      id: id,
    });
  }
}
