import { Redirect } from 'expo-router';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync()

export default function Home() {

  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
       setTimeout(()=>SplashScreen.hideAsync(),2000)
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
      }
    };

    hideSplashScreen();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Redirect href={'/(drawer)'}/>
    </View>
  );
}
