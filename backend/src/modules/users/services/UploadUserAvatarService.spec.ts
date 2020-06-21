import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

import UploadUserAvatarService from './UploadUserAvatarService';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('UploadAvatar', () => {
  it('should be able to create a new avatar', async () => {
    const FakeHash = new FakeHashProvider();
    const FakeStorage = new FakeStorageProvider();
    const FakeRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(FakeRepository, FakeHash);
    const createSession = new CreateSessionService(FakeRepository, FakeHash);
    const uploadAvatar = new UploadUserAvatarService(
      FakeRepository,
      FakeStorage,
    );

    const user = await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    await createSession.execute({
      email: 'hiro@gmail.com',
      password: '123123',
    });

    await uploadAvatar.execute({
      user_id: user.id,
      avatarFilename: 'file.txt',
    });

    expect(user.avatar).toBe('file.txt');
  });

  it('should not be able to update a new avatar', async () => {
    const FakeStorage = new FakeStorageProvider();
    const FakeRepository = new FakeUsersRepository();
    const uploadAvatar = new UploadUserAvatarService(
      FakeRepository,
      FakeStorage,
    );

    expect(
      uploadAvatar.execute({
        user_id: '2131231',
        avatarFilename: 'file.txt',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a new avatar', async () => {
    const FakeHash = new FakeHashProvider();
    const FakeStorage = new FakeStorageProvider();
    const FakeRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(FakeRepository, FakeHash);
    const createSession = new CreateSessionService(FakeRepository, FakeHash);
    const uploadAvatar = new UploadUserAvatarService(
      FakeRepository,
      FakeStorage,
    );

    const deleteFile = jest.spyOn(FakeStorage, 'deleteFile');

    const user = await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    await createSession.execute({
      email: 'hiro@gmail.com',
      password: '123123',
    });

    await uploadAvatar.execute({
      user_id: user.id,
      avatarFilename: 'file.txt',
    });

    await uploadAvatar.execute({
      user_id: user.id,
      avatarFilename: 'file2.txt',
    });

    expect(deleteFile).toHaveBeenCalledWith('file.txt');

    expect(user.avatar).toBe('file2.txt');
  });
});
