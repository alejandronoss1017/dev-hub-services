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
  async create(data: CreateUserDto): Promise<User> {
    return await this.usersService.create(data)
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAll(): Promise<Users> {
    const users = await this.usersService.findAll()
    return { users }
  }

  @GrpcMethod('UsersService', 'FindOne')
  async findOne({ id }: UserById): Promise<User> {
    return await this.usersService.findOne(id)
  }

  @GrpcMethod('UsersService', 'Update')
  async update(data: UpdateUserDto): Promise<User> {
    return await this.usersService.update(data)
  }

  @GrpcMethod('UsersService', 'Remove')
  async remove({ id }: UserById): Promise<void> {
    await this.usersService.remove(id)
    return
  }
}
