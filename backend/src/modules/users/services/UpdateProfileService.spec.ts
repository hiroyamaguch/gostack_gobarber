import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeHash: FakeHashProvider;
let fakeRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHash = new FakeHashProvider();
    fakeRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(fakeRepository, fakeHash);
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    const uploadUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Pedro Antônio',
      email: 'hiro213@gmail.com',
    });

    expect(uploadUser.name).toBe('Pedro Antônio');
    expect(uploadUser.email).toBe('hiro213@gmail.com');
  });

  it('shoud not be able to update to an exist e-mail', async () => {
    await fakeRepository.create({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const user = await fakeRepository.create({
      name: 'Hiroyuki',
      email: 'hiro@gmail.com',
      password: '125639',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Hiroyuki',
        email: 'pedro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update to an exist user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'wrong-id',
        name: 'Hiroyuki',
        email: 'pedro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to update password', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Hiroyuki',
      email: 'pedro@gmail.com',
      old_password: '123123',
      password: '1234565',
    });

    expect(updatedUser.password).toBe('1234565');
  });

  it('shoud not be able to update without old password', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Hiroyuki',
        email: 'pedro@gmail.com',
        password: '1234565',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update with wrong old password', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Hiroyuki',
        email: 'pedro@gmail.com',
        old_password: 'wrong_password',
        password: '1234565',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
