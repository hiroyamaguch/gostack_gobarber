import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const AppointmentCreated: React.FC = () => {
  const { signOut } = useAuth();

  return <View />;
};

export default AppointmentCreated;
