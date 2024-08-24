import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

function TimelineMinimal() {
  return <View>

  </View>
}

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>时间轴</Text>
      <TimelineMinimal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
