// import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import {CURRENT_TIMESTAMP} from '../utils/constants'
// import { ProductEntit } from "src/products/products.entity";
// import { ReviewEntit } from "src/reviews/reviews.entity";
// import { UserType } from "src/utils/enum";


// @Entity('users')
// export class UserEntitis{
//     @PrimaryGeneratedColumn()
//     id:number;

//     @Column({type:"varchar", length:"150", nullable:true})
//     username:string

//     @Column({type:"varchar", length:"250", unique:true})
//     email:string

//     @Column()
//     password:string

//     @Column({type:"enum", enum:UserType, default:UserType.NORMAL_USER})
//     userType:UserType

//     @Column({default:false})
//     isAccountVerified:boolean;
    
//     @UpdateDateColumn({type:"timestamp" , default:()=>"CURRENT_TIMESTAMPS(6)", onUpdate:"CURRENT_TIMESTAMPS(6)"})
//     updatedAt:Date;

//     @CreateDateColumn({type:"timestamp" , default:()=>"CURRENT_TIMESTAMPS(6)"})
//     createdAt:Date;

//     // link 
//     @OneToMany(()=>ProductEntit, (product)=>product.user,{
//         cascade:true,
        
//     })
//     product:ProductEntit[]

//     @OneToMany(()=>ReviewEntit, (review)=>review.user,{
//         cascade:true
//     })
//     review : ReviewEntit[]

// }