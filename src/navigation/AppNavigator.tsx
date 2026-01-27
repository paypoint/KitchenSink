import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import { ThemeProvider } from '../context/ThemeContext';

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <DrawerNavigator />
    </ThemeProvider>
  );
}