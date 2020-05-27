import styled from 'styled-components';
import { shade } from 'polished';

import SignInBackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh; /* Ocupa 100% da parte visível da tela */

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex; /*Coloca todos os componentes um do lado do outro */
  flex-direction: column; /* Coloca um do lado do outro em foma de coluna */
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1; /** Ocupa todo o espaço disponível */
  background: url(${SignInBackground}) no-repeat center;
  background-size: cover;
`;
