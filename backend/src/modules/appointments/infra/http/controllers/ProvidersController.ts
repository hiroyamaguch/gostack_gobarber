import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.body;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      except_user_id: provider_id,
    });

    return response.json(providers);
  }
}
