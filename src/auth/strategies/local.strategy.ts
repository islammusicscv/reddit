import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField:'email'
        });
    }
    validate(email:string, password:string) {
        console.log('local.strategy');
        const jwtUser = this.authService.validate({email:email,pass:password});
        console.log(jwtUser);
        if (!jwtUser) throw new UnauthorizedException();
        return jwtUser;
    }
}