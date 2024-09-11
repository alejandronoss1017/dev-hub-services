import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ReflectionService } from '@grpc/reflection'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['users', 'posts'],
        protoPath: [
          join(__dirname, '../src/users/users.proto'),
          join(__dirname, '../src/posts/posts.proto')
        ],
        url: 'dns:///business-logic-layer:5000',
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server)
        }
      }
    }
  )
  await app.listen().catch(err => {
    console.error('Error while starting the GRPC server:', err);
  });
}

bootstrap()
