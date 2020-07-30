import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiMail, FiLock } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContent, Background } from './styles';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordData {
  password: string;
  passwordConfirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('password/reset', {
          password: data.password,
          password_confirmation: data.passwordConfirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao resetar a senha',
          description: 'Verifique as senhas e tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={Logo} alt="Gobarber Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinir Senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Redefinir Senha</Button>
          </Form>
        </AnimationContent>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
