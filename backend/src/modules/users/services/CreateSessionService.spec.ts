import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('CreateSession', () => {
  it('should be able to create a new session', async () => {
    const FakeRepository = new FakeUsersRepository();
    const FakeHash = new FakeHashProvider();
    const createSession = new CreateSessionService(FakeRepository, FakeHash);
    const createUser = new CreateUserService(FakeRepository, FakeHash);

    const user = await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    const response = await createSession.execute({
      email: 'hiro@gmail.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a new session with non existing user', async () => {
    const FakeRepository = new FakeUsersRepository();
    const FakeHash = new FakeHashProvider();
    const createSession = new CreateSessionService(FakeRepository, FakeHash);
    const createUser = new CreateUserService(FakeRepository, FakeHash);

    expect(
      createSession.execute({ email: 'hiro2@gmail.com', password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new session with wrong password', async () => {
    const FakeRepository = new FakeUsersRepository();
    const FakeHash = new FakeHashProvider();
    const createSession = new CreateSessionService(FakeRepository, FakeHash);
    const createUser = new CreateUserService(FakeRepository, FakeHash);

    await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    expect(
      createSession.execute({ password: '123', email: 'hiro@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
