import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

export class NotificationsService {
    constructor(
        @InjectRepository(Notification) private readonly repository: Repository<Notification>
    ) {}

    findByLinkAt(linkAt: string) {
        return this.repository.findOne({ where: { linkAt } });
    }

    async create(notification: CreateNotificationDto) {
        if (!notification.updatedAt) notification.updatedAt = new Date();

        if (notification.linkAt) {
            const existingNotification = await this.findByLinkAt(notification.linkAt);
            if (existingNotification) {
                return this.repository.save({ id: existingNotification.id, ...notification, });
            }
        }

        const data = this.repository.create(notification);
        return this.repository.save(data);
    }
}