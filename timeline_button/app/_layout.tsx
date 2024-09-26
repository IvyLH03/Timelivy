import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { TimeblockDataContext } from '@/contexts/TimeblockDataContext';
import { TimeblockType } from '@/types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllTimeblockRemote, getData, storeData } from '@/utils/utils';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [timeblocks, setTimeblocks] = useState<TimeblockType[]>([])

  // load timeblock data from local storage on mount
  useEffect(() => {
    // get timeblock data from local storage
    // getData('timeblocks')
    //   .then(data => {
    //     if (data != null)
    //       setTimeblocks(data)
    //   })

    // get timeblock data from remote storage
    getAllTimeblockRemote()
    .then(data => {
      setTimeblocks(data)
      console.log(data)
    })
  }, [])

  const saveTimeblocks = (newTimeblocks:TimeblockType[]) => {
    setTimeblocks([...newTimeblocks])

  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TimeblockDataContext.Provider
        value={{ timeblocks, saveTimeblocks}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </TimeblockDataContext.Provider>
    </ThemeProvider>
  );
}
