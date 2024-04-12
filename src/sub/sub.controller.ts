import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {SubService} from "./sub.service";
import {CreateSubDto} from "./create-sub.dto";
import {SubEntity} from "./sub.entity";

@Controller('subs')
export class SubController {

    constructor(private subService: SubService) {
    }

    @Post()
    createSub(@Body() createSub:CreateSubDto):Promise<SubEntity> {
        return this.subService.create(createSub);
    }
    @Get()
    readAll():Promise<SubEntity[]> {
        return this.subService.readAll();
    }
    @Patch(':id')
    updateSub(@Param('id') id:number,@Body() updateSub:CreateSubDto) {
        this.subService.update(id, updateSub);
    }
    @Delete(':id')
    deleteSub(@Param('id') id:number) {
        this.subService.delete(id);
    }

}
