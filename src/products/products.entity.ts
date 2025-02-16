import { Column, CreateDateColumn,UpdateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import {CURRENT_TIMESTAMP} from '../utils/constants'
import { ReviewEntit } from "src/reviews/reviews.entity";
import { UserEntit } from "src/users/users.entity";

@Entity("products")
export class ProductEntit{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:"100"})
    title:string;

    @Column()
    description:string;

    @Column()
    price:number;

    @UpdateDateColumn({type:"timestamp" , default:()=>CURRENT_TIMESTAMP, onUpdate:CURRENT_TIMESTAMP})
    updatedAt:Date;

    @CreateDateColumn({type:"timestamp" , default:()=>CURRENT_TIMESTAMP})
    createdAt:Date;

    @OneToMany(()=>ReviewEntit, (review)=>review.product)
    review : ReviewEntit[];

    @ManyToOne(()=>UserEntit, (user)=>user.product,)
    user = UserEntit;
}