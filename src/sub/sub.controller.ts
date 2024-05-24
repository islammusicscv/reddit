import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Request} from '@nestjs/common';
import {SubService} from "./sub.service";
import {CreateSubDto} from "./create-sub.dto";
import {SubEntity} from "./sub.entity";
import {JwtGuard} from "../auth/guards/jwt.guard";

@Controller('subs')
export class SubController {

    constructor(private subService: SubService) {
    }

    @Post()
    @UseGuards(JwtGuard)
    createSub(@Body() createSub:CreateSubDto, @Request() req):Promise<SubEntity> {
        const userId = req.user.sub;
        return this.subService.create(createSub,userId);
    }
    @Get()
    readAll():Promise<SubEntity[]> {
        return this.subService.readAll();
    }
    @Get(':id')
    readOne(@Param('id') id:number):Promise<SubEntity> {
        return this.subService.readOne(id);
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
