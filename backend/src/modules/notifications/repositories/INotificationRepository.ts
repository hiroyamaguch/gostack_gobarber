import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationRepository {
  create(date: ICreateNotificationDTO): Promise<Notification>;
}
