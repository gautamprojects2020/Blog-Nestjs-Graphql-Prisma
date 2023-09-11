import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [UsersModule, PostsModule, CommentsModule, PrismaModule,GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    typePaths: ['./**/*.graphql'],
    context: ({ req, res }) => ({
      request: req,
  })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
