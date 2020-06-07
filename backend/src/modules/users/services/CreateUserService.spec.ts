import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const FakeRepository = new FakeUsersRepository();
    const FakeHash = new FakeHashProvider();
    const createUser = new CreateUserService(FakeRepository, FakeHash);

    const user = await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const FakeRepository = new FakeUsersRepository();
    const FakeHash = new FakeHashProvider();
    const createUser = new CreateUserService(FakeRepository, FakeHash);

    await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Pedro',
        email: 'hiro@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
