import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotPasswordEmailController from '../controllers/SendForgotPasswordEmailController';

const passwordsRouter = Router();

const resetPassword = new ResetPasswordController();
const sendForgotPasswordEmail = new SendForgotPasswordEmailController();

passwordsRouter.post('/reset', resetPassword.create);
passwordsRouter.post('/forgot', sendForgotPasswordEmail.create);

export default passwordsRouter;
