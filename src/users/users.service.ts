import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { CreateUserDto } from './interfaces/create-user-dto.interface'
import { UpdateUserDto } from './interfaces/update-user-dto.interface'
import { User } from './interfaces/user.interface'
//import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly graphqlEndpoint = 'http://persistence-layer:3000/graphql'
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly httpService: HttpService) {}

  async create({ email, firstName, lastName }: CreateUserDto){
    const mutation = `
    mutation CreateUser($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        id
        email
        firstName
        lastName
      }
    }`

    const variables = {
      createUserInput: {
        email,
        firstName,
        lastName
      }
    }

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          createUser: User
        }
      }>(this.graphqlEndpoint, {
        query: mutation,
        variables
      })
    )

    return response.data.data.createUser
  }

    async findAll(): Promise<User[]> {
      this.logger.debug('Finding all users method');
      
      const query = `
      query {
        users {
          id
          email
          firstName
          lastName
          posts {
            id
            title
            content
          }
        }
      }`;
    
      this.logger.log('GraphQL Query:', query);
    
      try {
        // Network connectivity check
        await this.httpService.get(this.graphqlEndpoint).toPromise();
        this.logger.debug('Network connectivity check passed');
    
        const response = await lastValueFrom(
          this.httpService.post<{
            data: {
              users: User[]
            }
          }>(this.graphqlEndpoint, {
            query,
            timeout: 5000 // Increase timeout to 5 seconds
          })
        );
    
        this.logger.log('GraphQL Response:', response.data);
        return response.data.data.users;
      } catch (error) {
        this.logger.error('Error while fetching users:', error.message);
        this.logger.error('Full error object:', JSON.stringify(error));
        if (error.response) {
          this.logger.error('Error response data:', JSON.stringify(error.response.data));
          this.logger.error('Error response status:', error.response.status);
          this.logger.error('Error response headers:', JSON.stringify(error.response.headers));
        }
        throw error;
      }
    }

  async findOne(id: number): Promise<User> {
    const query = `
    query($id: Int!) {
      user(id: $id) {
        id
        email
        firstName
        lastName
      }
    }`

    const variables = { id }

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          user: User
        }
      }>(this.graphqlEndpoint, {
        query,
        variables
      })
    )

    return response.data.data.user
  }

  async update({ id, email, firstName, lastName }: UpdateUserDto): Promise<User> {
    const mutation = `
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
      updateUser(updateUserInput: $updateUserInput) {
        id
        email
        firstName
        lastName
      }
    }`

    const variables = {
      updateUserInput: {
        id,
        email,
        firstName,
        lastName
      }
    }

    const response = await lastValueFrom(
      this.httpService.post<{
        data: {
          updateUser: User
        }
      }>(this.graphqlEndpoint, {
        query: mutation,
        variables
      })
    )

    return response.data.data.updateUser
  }

  async remove(id: number): Promise<void> {
    const mutation = `
    mutation RemoveUser($removeUserId: Int!) {
      removeUser(id: $removeUserId) {
        id
        email
        firstName
        lastName
      }
    }`

    await lastValueFrom(
      this.httpService.post<{
        data: {
          removeUser: { id: number }
        }
      }>(this.graphqlEndpoint, {
        query: mutation,
        variables: {
          removeUserId: id
        }
      })
    )

    return
  }
}
