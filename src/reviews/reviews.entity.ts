// import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import {CURRENT_TIMESTAMP} from '../utils/constants'
// import { ProductEntit } from "src/products/products.entity";
// import { UserEntit } from "src/users/users.entity";
// @Entity({name:"reviews"})
// export class ReviewEntit{
//     @PrimaryGeneratedColumn()
//     id:number;
//     @Column()
//     rating:string

//     @Column()
//     comment:string

//     @UpdateDateColumn({type:"timestamp" , default:()=>CURRENT_TIMESTAMP, onUpdate:CURRENT_TIMESTAMP})
//     updatedAt:Date;

//     @CreateDateColumn({type:"timestamp" , default:()=>CURRENT_TIMESTAMP})
//     createdAt:Date;

    
//     @ManyToOne(()=>ProductEntit, (products)=>products.review)
//     product : ProductEntit;

    
//     @ManyToOne(()=>UserEntit, (users)=>users.review)
//     user:UserEntit

// }