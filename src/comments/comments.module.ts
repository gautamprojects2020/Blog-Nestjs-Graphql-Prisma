import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from 'src/posts/posts.service';
import { CommentResolver } from './comment.resolver';


@Module({
  controllers: [CommentsController],
  providers: [PrismaService,CommentsService,PostsService,CommentResolver]
})
export class CommentsModule {}
