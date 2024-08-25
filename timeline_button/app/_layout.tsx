import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { TimeblockDataContext } from '@/contexts/TimeblockDataContext';
import { TimeblockType, TimeblockLabelType } from '@/types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [currentTimeblock, setCurrentTimeblock] = useState<TimeblockType>()
  const [labels, setLabels] = useState<TimeblockLabelType[]>([])

  const storeData = async (key:string, value:any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const updateCurrentTimeblock = (current: TimeblockType) => {
    setCurrentTimeblock(current)
    storeData('current-timeblock', current)
  }

  const saveCurrentTimeblock = () => {
    if(currentTimeblock){
      setTimeblocks(o => {
        let newTimeblocks = [...o, {...currentTimeblock, end:Date.now()}]
        storeData('timeblocks', newTimeblocks)
        return newTimeblocks
      } )
    }
  }

  // load timeblock data from local storage on mount
  useEffect(() => {
    // get timeblock data from local storage
    getData('timeblocks')
    .then(data => {
      if(data != null)
        setTimeblocks(data)
    })

    // get current timeblock data from local storage
    getData('current-timeblock')
    .then(data => {
      if(data != null)
        setCurrentTimeblock(data)
    })

  }, [])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TimeblockDataContext.Provider 
        value={{timeblocks, currentTimeblock, updateCurrentTimeblock, labels, saveCurrentTimeblock}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </TimeblockDataContext.Provider>
    </ThemeProvider>
  );
}
