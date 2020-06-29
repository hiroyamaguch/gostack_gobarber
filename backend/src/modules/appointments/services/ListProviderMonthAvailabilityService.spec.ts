import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let showAvailabilityProviders: ListProviderMonthAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    showAvailabilityProviders = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the available month appointments', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const appointments = await showAvailabilityProviders.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});
