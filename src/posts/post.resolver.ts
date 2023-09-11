import { Query,Resolver,Args,Mutation,Context,Parent } from "@nestjs/graphql";
import { Session,NotFoundException,UseGuards, Body } from '@nestjs/common'
import { PostsService } from "./posts.service";
import { AuthGuard } from "src/guards/auth.guard";
import { UsersService } from "src/users/users.service";


@Resolver()
export class PostResolver{
    constructor(private postservice:PostsService,private userService:UsersService){

    }
    @Query()
    posts(){
        return this.postservice.getAllPost() 
        // posts.then(function(result) {
        //     console.log(result) // "Some User token"
        //  })
       
    }
    @Query()
    postById(@Args() args:{id:string}){
        return this.postservice.findPostById(parseInt(args.id))

    }
    @Query()
    approvedPost(){
        return this.postservice.getApprovedPosts()

    }
    @Query()
    unappovedPost(){
        return this.postservice.getDisApprovePosts()
        
    }

    @Mutation('createPost')
    @UseGuards(AuthGuard)
    async createPost(@Args() args:{title:string,description:string},@Context() ctx: any){
        const id=ctx.request.session.userId
        const user= await this.userService.findUserById(id)
        console.log(user)
        if ((user.role)==='admin'){
            throw new NotFoundException('You are not authorize to create a article')
        }
        const {title,description}=args
        return this.postservice.createPost({
            title,
            description,
            user:{
                connect:{id:user.id}
            }
        })
    }
    @Mutation('approvePost')
    @UseGuards(AuthGuard)
     async approvePost(@Args() args:{id:string,published:boolean},@Context() ctx: any){
        const id=ctx.request.session.userId
        const user= await this.userService.findUserById(id)
        console.log(user)
        if ((user.role)!=='admin'){
            throw new NotFoundException('You are not authorize to approve the article')
        }
        return this.postservice.updatePost(parseInt(args.id),args.published
            )

    }

    

}
