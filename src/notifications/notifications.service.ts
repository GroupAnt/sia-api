import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

export class NotificationsService {
    constructor(
        @InjectRepository(Notification) private readonly repository: Repository<Notification>
    ) {}

    create(notification: CreateNotificationDto) {
        if (!notification.updatedAt) notification.updatedAt = new Date();

        const data = this.repository.create(notification);
        return this.repository.save(data);
    }
}