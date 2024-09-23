import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './interfaces/create-post-dto.interface'
import { Post } from './interfaces/post.interface'
import { UpdatePostDto } from './interfaces/update-post-dto.interface'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class PostsService {
  private readonly graphqlEndpoint = 'http://persistence-layer:3000/graphql'

  constructor(private readonly httpService: HttpService) {}

  async create({ title, content, authorId }: CreatePostDto) {
    const mutation = `
    mutation CreatePost($createPostInput: CreatePostInput!) {
      createPost(createPostInput: $createPostInput) {
        id
        title
        content
        authorId
      }
    }`

    const variables = {
      createPostInput: {
        title,
        content,
        authorId
      }
    }

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          createPost: Post
        }
      }>(
        this.graphqlEndpoint,
        {
          query: mutation,
          variables
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
    )

    return response.data.data.createPost
  }

  async findAll(): Promise<Post[]> {
    const query = `
    query {
      posts {
        id
        title
        content
        authorId
      }
    }`

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          posts: Post[]
        }
      }>(
        this.graphqlEndpoint,
        {
          query,
          variables: {}
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
    )

    return response.data.data.posts
  }

  async findOne(id: number): Promise<Post> {
    const query = `
    query($id: Int!) {
      post(id: $id) {
        id
        title
        content
        authorId
      }
    }`

    const variables = { id }

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          post: Post
        }
      }>(
        this.graphqlEndpoint,
        {
          query,
          variables
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
    )

    return response.data.data.post
  }

  async update({ id, title, content }: UpdatePostDto): Promise<Post> {
    const mutation = `
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
      updatePost(updatePostInput: $updatePostInput) {
        id
        title
        content
        authorId
      }
    }`

    const variables = {
      updatePostInput: {
        id,
        title,
        content
      }
    }

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          updatePost: Post
        }
      }>(
        this.graphqlEndpoint,
        {
          query: mutation,
          variables
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
    )

    return response.data.data.updatePost
  }

  async remove(id: number): Promise<void> {
    const mutation = `
    mutation RemovePost($removePostId: Int!) {
      removePost(id: $removePostId) {
        id
        title
        content
        authorId
      }
    }`

    const variables = {
      removePostId: id
    }

    await lastValueFrom(
      this.httpService.post<{
        data: {
          removePost: { id: number }
        }
      }>(
        this.graphqlEndpoint,
        {
          query: mutation,
          variables
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
    )

    return
  }
}
