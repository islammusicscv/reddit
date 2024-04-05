import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt';
import {Exclude} from "class-transformer";
import {ArticleEntity} from "../article/article.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    email: string;
    @Exclude()
    @Column()
    pass: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=>ArticleEntity, (articleEntity: ArticleEntity)=>articleEntity.user)
    articles:ArticleEntity[];
    @BeforeInsert()
    async hashPassword() {
        this.pass = await bcrypt.hash(this.pass,10);
    }

}