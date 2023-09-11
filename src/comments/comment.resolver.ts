import { Query,Resolver,Args,Mutation,Context ,Parent,Info} from "@nestjs/graphql";
import { Session,NotFoundException,UseGuards, Body } from '@nestjs/common'
import { AuthGuard } from "src/guards/auth.guard";
import { CommentsService } from "./comments.service";
import { PostsService } from "src/posts/posts.service";




@Resolver()
export class CommentResolver{
    constructor(private commentService:CommentsService,private postService:PostsService){

    }
    @Query()
    comments(){
        return this.commentService.getAllComments()
    }

    @Mutation('createComment')
    @UseGuards(AuthGuard)
    async createComment(@Args() args:{text:string,post:string},@Context() ctx: any,@Parent() pt:any){
        const userId=ctx.request.session.userId
        const post= await this.postService.findPostById(parseInt(args.post))
        //console.log(post.id)
        if (post===null){
            throw new NotFoundException('Post not found')
        }
        const text=args.text
        const idPost=Number(args.post)
        console.log(text,idPost)
        return this.commentService.createComment({
            text,
            user:{
                connect:{id:userId}
            },
            post:{
                connect:{id:idPost}
            }
    })
    }
}