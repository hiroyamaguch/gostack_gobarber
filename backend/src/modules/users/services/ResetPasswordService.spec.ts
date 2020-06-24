import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/FakeUsersTokenRepository';

import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';

let fakeHash: FakeHashProvider;
let fakeRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;
let fakeUsersTokenRepository: FakeUsersTokenRepository;

describe('ResetPasswordService', () => {
  beforeEach(async () => {
    fakeRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHash = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeRepository,
      fakeUsersTokenRepository,
      fakeHash,
    );
  });

  it('it should be able to reset the password', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '684679',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const hashSpy = jest.spyOn(fakeHash, 'generateHash');

    await resetPassword.execute({ password: '123456', token });

    const updatedUser = await fakeRepository.findById(user.id);

    expect(hashSpy).toHaveBeenCalledWith('123456');
    expect(updatedUser?.password).toBe('123456');
  });

  it('it not should be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing token',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it not should be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokenRepository.generate(
      'non-existing user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('token must have less than 2 hour of life to reset the password', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '684679',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
