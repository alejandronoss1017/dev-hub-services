import { Controller } from '@nestjs/common'
import { PostsService } from './posts.service'
import { GrpcMethod } from '@nestjs/microservices'
import { CreatePostDto } from './interfaces/create-post-dto.interface'
import { Post } from './interfaces/post.interface'
import { Posts } from './interfaces/posts.interface'
import { PostById } from './interfaces/post-by-id.interface'
import { UpdatePostDto } from './interfaces/update-post-dto.interface'
@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @GrpcMethod('PostsService', 'Create')
  async create(data: CreatePostDto): Promise<Post> {
    return await this.postsService.create(data)
  }

  @GrpcMethod('PostsService', 'FindAll')
  async findAll(): Promise<Posts> {
    return {
      posts: await this.postsService.findAll()
    }
  }

  @GrpcMethod('PostsService', 'FindOne')
  async findOne({ id }: PostById): Promise<Post> {
    return await this.postsService.findOne(id)
  }

  @GrpcMethod('PostsService', 'Update')
  update(data: UpdatePostDto): Promise<Post> {
    return this.postsService.update(data)
  }

  @GrpcMethod('PostsService', 'Remove')
  remove({ id }: PostById): Promise<void> {
    return this.postsService.remove(id)
  }
}
