import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { TimeblockType } from '@/types/common';
import { useContext } from 'react';
import { TimeblockDataContext, TimeblockDataContextType } from '@/contexts/TimeblockDataContext';

function TimeBlock(props:{data:TimeblockType}) {
  return <View style={styles.timeblock}>
    <Text style={styles.timeblockText}>
      {props.data?.id}
      {'\n'}
      {props.data?.event}
      {'\n'}
      {props.data?.start}
      {'\n'}
      {props.data?.end}
    </Text>
  </View>
}


export default function TimelineScreen() {

  const timeblockDataContext = useContext(TimeblockDataContext) as TimeblockDataContextType
  const {timeblocks} = timeblockDataContext 
  
  function TimelineMinimal() {
    return <View style={styles.timelineContainerView}>
      <View style={styles.timelineAxis}/>
      <View style={styles.timeblockContainer}>
        {
          timeblocks.map(o => <TimeBlock data={o} key={o.id}/>)
        }
      </View>
    </View>
  }

  return (
    <View style={styles.container}>
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
  timelineContainerView: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  timelineAxis: {
    width: 10,
    height: '100%',
    backgroundColor: '#8f8f8f',
    position: 'absolute',
    left: 50,
  },
  timeblockContainer: {
    flex:1,
    flexDirection: 'column',
    marginHorizontal:50,
    backgroundColor:'#8f8f8f55'
  },
  timeblock: {
    padding: 10,
    paddingLeft: 30,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  timeblockText: {

  }
});
