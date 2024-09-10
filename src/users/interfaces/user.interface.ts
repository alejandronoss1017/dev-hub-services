import { Post } from "src/posts/interfaces/post.interface"

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  posts: Post[]
}
