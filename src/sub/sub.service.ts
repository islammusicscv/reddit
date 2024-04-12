import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SubEntity} from "./sub.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateSubDto} from "./create-sub.dto";

@Injectable()
export class SubService {
    constructor(@InjectRepository(SubEntity) private readonly subRepository:Repository<SubEntity>) {
    }

    async create(createSub: CreateSubDto):Promise<SubEntity> {
        const user_id=1;
        const data = {...createSub,user:{id:user_id}};
        const sub = this.subRepository.create(data);
        return await this.subRepository.save(sub);
    }

    async readAll():Promise<SubEntity[]> {
        return await this.subRepository.find();
    }

    delete(id:number):Promise<DeleteResult> {
        // Debugging: Log the value of id
        console.log('Received id for deletion:', id);

        // Check if id is falsy
        if (!id) {
            throw new Error('Invalid id for deletion');
        }

        // Call the delete method with the provided id
        return this.subRepository.delete(id);
    }

    async update(id:number, updateSub:CreateSubDto) {
        await this.subRepository.update(id,updateSub);
        return this.subRepository.findOneBy({id});
    }
}
