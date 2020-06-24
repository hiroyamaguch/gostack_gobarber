import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';

import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('Pedro');
    expect(profile.email).toBe('hiro@gmail.com');
  });

  it('shoud not be able to show the user profile', async () => {
    await expect(
      showProfile.execute({ user_id: 'wrong-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
