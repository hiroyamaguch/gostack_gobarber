import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  padding: 16px 0 ${12 + getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232129;
  background: #312e38;

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const BackToSignInButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  margin-left: 16px;
`;
