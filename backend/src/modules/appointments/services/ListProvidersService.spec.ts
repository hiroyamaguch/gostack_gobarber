import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let showProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Tiago',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123123',
    });

    const providers = await showProviders.execute({
      except_user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
