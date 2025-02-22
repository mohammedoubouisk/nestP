import { ArchiveEntit } from 'src/archive/archive.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntit } from 'src/userdoc/userdoc.entity';


export enum AuditAction {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
    OTHER = 'other'
}

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    enum: AuditAction,
  })
  action: AuditAction;

  @Column({ nullable: true })
  archive_id: string;


  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => UserEntit)
  @JoinColumn({ name: 'user_id' })
  user: UserEntit;

  @ManyToOne(() => ArchiveEntit, { 
    nullable: true, 
    createForeignKeyConstraints: false 
  })
  @JoinColumn({ name: 'archive_id' })
  archive: ArchiveEntit;


}