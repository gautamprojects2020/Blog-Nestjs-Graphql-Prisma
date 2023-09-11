import { Query,Resolver,Args,Mutation,Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { Session,NotFoundException,UseGuards } from '@nestjs/common'
import { AuthGuard } from "src/guards/auth.guard";

@Resolver('User')
export class UserResolver{
    constructor(private authService:AuthService,private userService:UsersService){
        
    }

    @Query()
    
    users(@Context() ctx: any){
        console.log(ctx.request.session.userId)
        return this.userService.getAllUsers()
    }
    @Query()
    userById(@Args() args:{id:string}){
        console.log(args)
       return this.userService.findUserById(parseInt(args.id))
      
    }
    @Query()
    userByEmail(@Args() args:{email:string}){
        console.log(args)
       return this.userService.findUser(args.email)
      
    }
    @Query()
    logout(@Context() ctx: any){
        console.log(ctx.request.session.userId)
        const id=ctx.request.session.userId
        ctx.request.session.userId=null
        console.log(ctx.request.session)

        return this.userService.findUserById(id)

    }

    @Mutation()
    createUser(@Args() args:{name:string,email:string,password:string},@Context() ctx: any){
        console.log(args)
        console.log(ctx.request.session.userId)
         return this.authService.signup(args.name,args.email,args.password)

    }
    @Mutation()
    createAdmin(@Args() args:{name:string,email:string,password:string}){
        return this.authService.signupAdmin(args.name,args.email,args.password)
        

    }
    @Mutation('signUser')
    async signUser(@Args() args:{email:string,password:string,},@Context() ctx: any){
        console.log(args)
        const user= await this.authService.signin(args.email,args.password)
        console.log(user)
        console.log(ctx.request.session.userId)
        ctx.request.session.userId=user.id
        console.log(ctx.request.session) 
        
        return user

    }

    

}