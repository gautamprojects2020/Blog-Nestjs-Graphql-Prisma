import {Injectable,BadRequestException,NotFoundException} from "@nestjs/common"
import { randomBytes,scrypt as _scrypt } from "crypto"
import { promisify } from "util"
import { UsersService } from "./users.service"

const scrypt=promisify(_scrypt)
@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}
    async signup(name:string,email:string,password:string){
        const users=await this.usersService.findUser(email)
        console.log(users)
        // @ts-ignore
        if(users!==null){
            throw new BadRequestException('email in use')
        }
        const salt=randomBytes(8).toString('hex')
        const hash= (await scrypt(password,salt,32)) as Buffer
        const result=salt+'.'+hash.toString('hex')
        const user= await this.usersService.createUser({name,email,password:result})
        console.log(user)
        return user
    }
    async signupAdmin(name:string,email:string,password:string){
        const users=await this.usersService.findUser(email)
        console.log(users)
        // @ts-ignore
        if(users!==null){
            throw new BadRequestException('email in use')
        }
        const salt=randomBytes(8).toString('hex')
        const hash= (await scrypt(password,salt,32)) as Buffer
        const result=salt+'.'+hash.toString('hex')
        const user= await this.usersService.createUser({name,email,password:result,role:"admin"})
        console.log(user)
        return user
    }

    async signin(email:string,password:string){
         
        const user= await this.usersService.findUser(email)
        if (!user){
            throw new NotFoundException('user not found')
        }
        const [salt,storedhash]=user.password.split('.')
        const hash=(await scrypt(password,salt,32)) as Buffer
        if (storedhash!==hash.toString('hex')){
            throw new BadRequestException('bad password')
           
        }
        return user
    }
}