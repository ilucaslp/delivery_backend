import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Delivery } from '../delivery/delivery.entity';
import { Office } from '../office/office.entity'; // Importe a entidade Office

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code_order: string;

  @Column({ default: 1 })
  status: number; // 1 - Em rota | 2 - Entregue | 3 - Cancelado

  @Column()
  payment_method: string;

  @Column({ type: "float", default: 0 })
  tax_delivery: number;

  @ManyToOne(() => Delivery, (delivery) => delivery.attendances)
  delivery: Delivery;

  @ManyToOne(() => Office, (office) => office.attendances)
  office: Office; // Cada Attendance pertence a um Office

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
