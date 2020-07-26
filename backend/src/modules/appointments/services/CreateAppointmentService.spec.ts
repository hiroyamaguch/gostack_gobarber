import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      provider_id: '212890',
      user_id: '212891',
      date: new Date(2020, 4, 20, 13),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new appointment on same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await createAppointment.execute({
      provider_id: '212890',
      user_id: '212891',
      date: new Date(2020, 10, 20, 14),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: '212890',
        user_id: '212891',
        date: new Date(2020, 10, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: '212890',
        user_id: '212891',
        date: new Date(2020, 4, 20, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: '212891',
        user_id: '212891',
        date: new Date(2020, 4, 20, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: '212890',
        user_id: '212891',
        date: new Date(2020, 4, 21, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: '21289',
        user_id: '212891',
        date: new Date(2020, 4, 21, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
