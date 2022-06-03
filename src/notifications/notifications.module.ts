import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  exports: [NotificationsService],
  providers: [
    {
      provide: 'NOTIFICATION_QUEUE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [ process.env.QUEUE_URL ],
            queue: process.env.QUEUE_NAME,
            queueOptions: { durable: true },
            noAck: false
          }
        });
      }
    },
    NotificationsService
  ]
})
export class NotificationsModule {}
