import { ArchiveEntit } from './../archive/archive.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  reservation_id: string;

  @Column()
  archive_id: string;

  @Column()
  employe: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  date_debut: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  date_fin: Date;

  @ManyToOne(() => ArchiveEntit)
  @JoinColumn({ name: 'archive_id' })
  archive: ArchiveEntit;
}