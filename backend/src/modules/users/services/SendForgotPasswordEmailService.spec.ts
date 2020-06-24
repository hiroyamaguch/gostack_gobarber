import FakeUsersTokenRepository from '@modules/users/repositories/fakes/FakeUsersTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(async () => {
    fakeRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });

  it('it should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '684679',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'hiro@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('it should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'hiro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should be able to receiver a new token', async () => {
    const tokenGenerated = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeRepository.create({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '684679',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'hiro@gmail.com',
    });

    expect(tokenGenerated).toHaveBeenCalledWith(user.id);
  });
});
