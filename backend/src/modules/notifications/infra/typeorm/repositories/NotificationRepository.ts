import { MongoRepository, getMongoRepository } from 'typeorm';

import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

class AppointmentRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notifications>;

  constructor() {
    this.ormRepository = getMongoRepository(Notifications, 'mongo');
  }

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notifications> {
    const notification = this.ormRepository.create({
      recipient_id,
      content,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default AppointmentRepository;
