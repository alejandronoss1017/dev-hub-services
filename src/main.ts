import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ReflectionService } from '@grpc/reflection'

async function bootstrap() {
  // You can switch to a microservice with NestFactory.createMicroservice() as follows:

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['users', 'posts'],
        protoPath: [
          join(__dirname, 'users/users.proto'),
          join(__dirname, 'posts/posts.proto')
        ],
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server)
        }
      }
    }
  )
  await app.listen()
}

bootstrap()
