import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 16px;
  height: 60px;
  width: 100%;
  border-width: 2px;
  border-color: #232129;

  ${props =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-width: 2px;
      border-color: #ff9000;
    `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
