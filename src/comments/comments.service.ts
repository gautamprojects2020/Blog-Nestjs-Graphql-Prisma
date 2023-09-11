import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment, Prisma } from '@prisma/client'

@Injectable()
export class CommentsService {

    constructor(private prismaService:PrismaService){}

    async getAllComments(){
        return this.prismaService.comment.findMany({
          include: {
            user: true,
            post:true
          }
        }
         )
      }



    async createComment(data: Prisma.CommentCreateInput):Promise<Comment>{
        return this.prismaService.comment.create({data})
            
    }
}
