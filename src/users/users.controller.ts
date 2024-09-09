import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { Users } from './interfaces/users.interface'
import { CreateUserDto } from './interfaces/create-user-dto.interface'
import { User } from './interfaces/user.interface'
import { UserById } from './interfaces/user-by-id.interface'
import { UpdateUserDto } from './interfaces/update-user-dto.interface'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'Create')
  create(data: CreateUserDto): User {
    return this.usersService.create(data)
  }

  @GrpcMethod('UsersService', 'FindAll')
  findAll(): Users {
    return {
      users: this.usersService.findAll()
    }
  }

  @GrpcMethod('UsersService', 'FindOne')
  findOne({ id }: UserById): User {
    return this.usersService.findOne(id)
  }

  @GrpcMethod('UsersService', 'Update')
  update(data: UpdateUserDto): User {
    return this.usersService.update(data)
  }

  @GrpcMethod('UsersService', 'Remove')
  remove({ id }: UserById): void {
    this.usersService.remove(id)
    return
  }
}
