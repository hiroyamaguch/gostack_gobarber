import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotPasswordEmailController from '../controllers/SendForgotPasswordEmailController';

const passwordsRouter = Router();

const resetPassword = new ResetPasswordController();
const sendForgotPasswordEmail = new SendForgotPasswordEmailController();

passwordsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.create,
);
passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendForgotPasswordEmail.create,
);

export default passwordsRouter;
