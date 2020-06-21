import { container } from 'tsyringe';

import IHashRepository from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashRepository>(
  'HashProvider',
  BCryptHashProvider,
);
