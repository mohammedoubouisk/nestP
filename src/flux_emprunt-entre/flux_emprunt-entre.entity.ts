import { ArchiveEntit } from './../archive/archive.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('flux_retours')
export class FluxRetourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  archive_id: string;

  @Column({
    type: 'datetime',
    nullable: false
  })
  date_retoure: Date;

  @Column('json')
  employe: {
    matricule: string;
    nom: string;
    prenom: string;
    fonction: string;
  };

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ArchiveEntit)
  @JoinColumn({ name: 'archive_id' })
  archive: ArchiveEntit;
}