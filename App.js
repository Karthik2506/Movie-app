
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import Navigation from './src/navigation/Navigation';
import AppStack from './src/stacks/AppStack';

const App = () => {
  return (
   
      <GluestackUIProvider config={config}>
        <AppStack/> 
      <StatusBar bg='#2c3e50'/>
      </GluestackUIProvider>
    
    
  )
    
}


export default App;