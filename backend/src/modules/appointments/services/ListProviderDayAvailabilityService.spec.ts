import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let showAvailabilityProviders: ListProviderDayAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    showAvailabilityProviders = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the available month appointments', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    const appointments = await showAvailabilityProviders.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 16, available: true },
        { hour: 17, available: false },
      ]),
    );
  });
});
