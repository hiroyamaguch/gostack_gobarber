import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 16px;
  height: 60px;
  width: 100%;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 5px;
`;
