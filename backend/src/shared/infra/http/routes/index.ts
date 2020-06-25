import { Router } from 'express';

import appoitmentsRouter from '@modules/appointments/infra/http/routes/appointements.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appoitmentsRouter);
routes.use('/providers', providersRouter);

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
