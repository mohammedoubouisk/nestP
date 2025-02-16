import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ArchiveEntit } from 'src/archive/archive.entity';

@Entity('flux_sortants')
export class FluxSortantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  archive_id: string;

  @Column('date')
  date_sortie: Date;

  @Column()
  site_destination: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ArchiveEntit)
  @JoinColumn({ name: 'archive_id' })
  archive: ArchiveEntit;
}