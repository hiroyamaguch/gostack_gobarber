import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProvidersService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllAppointmentsByProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    console.log(appointments);

    return [{ day: 1, available: true }];
  }
}

export default ListProvidersService;
