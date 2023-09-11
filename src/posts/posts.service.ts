import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma } from '@prisma/client'
@Injectable()
export class PostsService {

    constructor(private prismaService:PrismaService){
        
    }
    async getAllPost(){
        return this.prismaService.post.findMany({
          include: {
            user: true,
            comments :true

          }
        }
         )
      }

    async createPost(data: Prisma.PostCreateInput):Promise<Post>{
        return this.prismaService.post.create({data})
            
    }
    async findPostById(
        id:number
      ): Promise<Post | null> {
        if (!id){
            return null
        }
        return this.prismaService.post.findUnique({
          where: {id},
          include: {
            user: true,
            comments :true

          }
        })
      }
      async updatePost(id:number,published:boolean): Promise<Post> {
        return this.prismaService.post.update({
        where:{
            id: id
          },
          data:{
            published:published
          }
          
        });
      }

      async getApprovedPosts(){
        return this.prismaService.post.findMany({
            where:{
                published:true
            },
            include: {
              user: true,
              comments :true
  
            }
        }
            
        )
    }
    async getDisApprovePosts(){
        return this.prismaService.post.findMany({
            where:{
                published:false
            },
            include: {
              user: true,
              comments :true
  
            }
        }
            
        )

    }
}
