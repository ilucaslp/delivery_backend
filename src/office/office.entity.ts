import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Attendance } from '../attendance/attendance.entity'; // Importe a entidade Attendance

@Entity()
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  /**
   * opened - 1 - Em espera | 2 - Aberto | 3 - Fechado
   */
  opened: number;

  @Column({ type: 'float', default: 4 })
  price_tax_default: number;

  @Column({
    nullable: true
  })
  opened_at: Date;

  @Column({
    nullable: true
  })
  closed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.office)
  attendances: Attendance[]; // Um Office pode ter muitos Attendances
}
