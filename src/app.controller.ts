import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices/ctx-host/rmq.context';
import { Ctx } from '@nestjs/microservices/decorators/ctx.decorator';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { Payload } from '@nestjs/microservices/decorators/payload.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
  }
}
