import { ArchiveEntit } from './../archive/archive.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('flux_emprunts')
export class FluxEmpruntEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  archive_id: string;

  @Column('date')
  date_sortie: Date;

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