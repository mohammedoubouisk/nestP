import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('archives')
export class ArchiveEntit {
  @PrimaryGeneratedColumn() // uuid if you want to securate id  il mettre id etre power 
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  keywords: string[];

  @Column('date')
  date_created: Date;

  @Column('json')
  location: {
    site: string;
    locale: string;
    armoires: string;
    etageres: string;
  };

  @Column({ nullable: true })
  file_url: string;

  @Column({ unique: true })
  code_barre: string;

  @Column('json')
  metadata: {
    auteur: string;
    duree_conservation_ans: number;
  };

  @Column('json')
  classification: {
    serie: string;
    dossier: string;
    sous_dossier: string;
    entite_source: string;
  };

  @Column({
    type: 'enum',
    enum: ['public', 'restreint', 'confidentiel'],
    default: 'public'
  })
  access_restriction: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}