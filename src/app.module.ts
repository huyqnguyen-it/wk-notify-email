import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.QUEUE_URI],
          queue: process.env.QUEUE_NAME,
          queueOptions: process.env.QUEUE_OPTION
            ? JSON.parse(process.env.QUEUE_OPTION)
            : {},
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
