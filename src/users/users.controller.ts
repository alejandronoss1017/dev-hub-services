import { Controller, Logger } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { Users } from './interfaces/users.interface'
import { CreateUserDto } from './interfaces/create-user-dto.interface'
import { User } from './interfaces/user.interface'
import { UserById } from './interfaces/user-by-id.interface'
import { UpdateUserDto } from './interfaces/update-user-dto.interface'

@Controller()
export class UsersController {
  private readonly logger = new Logger(UsersController.name)

  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'Create')
  async create(data: CreateUserDto): Promise<User> {
    this.logger.debug(`Creating user with data: ${JSON.stringify(data)}`)
    return await this.usersService.create(data)
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAll(): Promise<Users> {
    this.logger.debug('Finding all users')
    const users = await this.usersService.findAll()
    this.logger.debug(`Found users: ${JSON.stringify(users)}`)
    return { users }
  }

  @GrpcMethod('UsersService', 'FindOne')
  async findOne({ id }: UserById): Promise<User> {
    this.logger.debug(`Finding user with id: ${id}`)
    return await this.usersService.findOne(id)
  }

  @GrpcMethod('UsersService', 'Update')
  async update(data: UpdateUserDto): Promise<User> {
    this.logger.debug(`Updating user with data: ${JSON.stringify(data)}`)
    return await this.usersService.update(data)
  }

  @GrpcMethod('UsersService', 'Remove')
  async remove({ id }: UserById): Promise<void> {
    this.logger.debug(`Removing user with id: ${id}`)
    await this.usersService.remove(id)
    return
  }
}
