import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PostsModule } from './posts/posts.module'
import { HealthController } from './heatlh.controller'

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [HealthController],
  providers: []
})
export class AppModule {}
