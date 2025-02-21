
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "src/utils/enum";
// import { AuditLogEntity } from "../audit/entities/audit-log.entity";

@Entity('userdoc')
export class UserEntit {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "varchar", length: 150, nullable: true})
    username: string;
    
    @Column({type: "varchar", length: 250, unique: true})
    email: string;
    
    @Column()
    password: string;
    
    @Column({type: "enum", enum: UserType, default: UserType.NORMAL_USER})
    userType: UserType;
    
    @Column({default: false})
    isAccountVerified: boolean;
    
    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updatedAt: Date;
    
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date   

}