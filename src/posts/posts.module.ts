import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PostResolver } from './post.resolver';

@Module({
  controllers: [PostsController],
  providers: [PrismaService,PostsService,UsersService,PostResolver]
})
export class PostsModule {}
