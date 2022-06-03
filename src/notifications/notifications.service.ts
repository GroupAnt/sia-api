import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import ConvertioAPI from '../api/convertio/convertio.api';

export class NotificationsService {
    private readonly convertioAPI: ConvertioAPI = new ConvertioAPI();

    constructor(
        @Inject('NOTIFICATION_QUEUE') private readonly notificationQueue: ClientProxy,
        @InjectRepository(Notification) private readonly repository: Repository<Notification>
    ) {}

    findByLinkAt(linkAt: string) {
        return this.repository.findOneBy({ linkAt });
    }

    async create(notification: CreateNotificationDto) {
        if (!notification.updatedAt) notification.updatedAt = new Date();

        if (notification.linkAt) {
            const exists = await this.findByLinkAt(notification.linkAt);
            if (exists) {
                return this.repository.save({ id: exists.id, ...notification, });
            }
        }

        const data = this.repository.create(notification);
        const saved = await this.repository.save(data);

        const url = new URL(notification.linkAt);
        const pathname = url.pathname;
        if (pathname.includes('.pdf')) {
            this.notificationQueue.emit('processJob', saved);
        }

        return saved;
    }

    update(id: string, notification: UpdateNotificationDto) {
        return this.repository.save({ id, ...notification });
    }

    async callback(conversionId: string, step: string) {
        const data = await this.convertioAPI.get({ id: conversionId, type: 'base64' });
        
        const notification = await this.repository.findOneBy({ externalId: conversionId });
        if (notification) return this.repository.save({ id: notification.id, description: data.content });

        return;
    }
}