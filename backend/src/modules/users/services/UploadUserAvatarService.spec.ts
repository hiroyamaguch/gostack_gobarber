import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessionService';
import UploadUserAvatarService from './UploadUserAvatarService';

let fakeHash: FakeHashProvider;
let fakeStorage: FakeStorageProvider;
let fakeRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;
let createSession: CreateSessionService;
let uploadAvatar: UploadUserAvatarService;

describe('UploadAvatar', () => {
  beforeEach(() => {
    fakeHash = new FakeHashProvider();
    fakeStorage = new FakeStorageProvider();
    fakeRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createSession = new CreateSessionService(fakeRepository, fakeHash);
    uploadAvatar = new UploadUserAvatarService(fakeRepository, fakeStorage);
    createUser = new CreateUserService(
      fakeRepository,
      fakeHash,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new avatar', async () => {
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
    await expect(
      uploadAvatar.execute({
        user_id: '2131231',
        avatarFilename: 'file.txt',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');

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
