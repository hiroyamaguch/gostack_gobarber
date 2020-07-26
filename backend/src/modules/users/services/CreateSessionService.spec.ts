import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

import CreateSessionService from './CreateSessionService';

let fakeRepository: FakeUsersRepository;
let fakeHash: FakeHashProvider;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    fakeHash = new FakeHashProvider();

    createSession = new CreateSessionService(fakeRepository, fakeHash);
  });

  it('should be able to create a new session', async () => {
    const user = await fakeRepository.create({
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
    await expect(
      createSession.execute({ email: 'hiro2@gmail.com', password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new session with wrong password', async () => {
    await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    await expect(
      createSession.execute({ password: '123', email: 'hiro@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
