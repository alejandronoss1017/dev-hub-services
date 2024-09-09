import { Injectable } from '@nestjs/common'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './interfaces/create-user-dto.interface'
import { UpdateUserDto } from './interfaces/update-user-dto.interface'

const users: User[] = [
  {
    id: 1,
    email: 'john@email.com',
    firstName: 'John',
    lastName: 'Doe',
    posts: []
  },
  {
    id: 2,
    email: 'alice@email.com',
    firstName: 'Alice',
    lastName: 'Caeiro',
    posts: []
  },
  {
    id: 3,
    email: 'jane@email.com',
    firstName: 'Jane',
    lastName: 'Doe',
    posts: []
  }
]

@Injectable()
export class UsersService {
  create({ email, firstName, lastName }: CreateUserDto): User {
    users.push({
      id: users.length + 1,
      email,
      firstName,
      lastName,
      posts: []
    })

    return users[users.length - 1]
  }

  findAll() {
    return users
  }

  findOne(id: number): User {
    return users.find((user) => user.id === id)
  }

  update({ id, email, firstName, lastName }: UpdateUserDto): User {
    users.map((user) => {
      if (user.id === id) {
        user.email = email
        user.firstName = firstName
        user.lastName = lastName
      }
    })

    return users.find((user) => user.id === id)
  }

  remove(id: number): void {
    const index = users.findIndex((user) => user.id === id)

    if (index === -1) {
      return
    }

    users.splice(index, 1)
    return
  }
}
