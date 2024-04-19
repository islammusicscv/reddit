import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {LoginDto} from "./login.dto";
import {AuthService} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalGuard)
    login (@Body() loginDto: LoginDto) {
        return this.authService.validate(loginDto);
    }

    @Get('profile')
    getUserData() {

    }
}
