import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.QUEUE_URI],
        queue: process.env.QUEUE_NAME,
        queueOptions: process.env.QUEUE_OPTION
          ? JSON.parse(process.env.QUEUE_OPTION)
          : {},
      },
    },
  );
  app.listen();
}
bootstrap();
