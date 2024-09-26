import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useContext, useEffect, useState } from 'react';
import { TimeblockDataContext, TimeblockDataContextType } from '@/contexts/TimeblockDataContext';
import { TimeblockType } from '@/types/common';
import { formatTimeInterval, postTimeblockRemote } from '@/utils/utils';

export default function TimetrackScreen() {
  const timeblockDataContext = useContext(TimeblockDataContext) as TimeblockDataContextType

  const {timeblocks, saveTimeblocks} = timeblockDataContext 
  let currentTimeblock = timeblocks[timeblocks.length-1]

  const [eventName, setEventName] = useState<string>("")
  const [eventTimeLasting, setEventTimeLasting] = useState<number>(0)

  // execute when start button is pressed
  const onEventStart = () => {
    // update old current block
    timeblocks[timeblocks.length-1].end = Date.now()

    // add a new current block
    let newTimeblock = {
      event:eventName,
      start: Date.now(),
      end:0,
      description:"no description",
      id:-1
    }

    postTimeblockRemote(newTimeblock)
    .then(id => newTimeblock.id = id)
    .then(() => {
      saveTimeblocks([...timeblocks, newTimeblock])
      // clear TextInput text
      setEventName("")

      // update event timer
      setEventTimeLasting(0)
    })

  }

  // update event timer when timeblock information is updated
  useEffect(() => {
    const updateEventTimeLasting = () => {
      if(currentTimeblock){
        setEventTimeLasting(Math.floor((Date.now() - currentTimeblock.start)/1000))
      }
      else {
        setEventTimeLasting(Date.now()/1000)
      }
    }
    let eventTimeUpdateInterval = setInterval(updateEventTimeLasting, 1000)

    return () => clearInterval(eventTimeUpdateInterval);
  }, [timeblocks])

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>记录</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {
        currentTimeblock?
        <>
          <Text>目前正在做：{currentTimeblock?.event}</Text>
          <Text>已经做了：{formatTimeInterval(eventTimeLasting)}</Text>
        </>:<>
          <Text>（没有正在进行的事项）</Text>
        </>
      }
      
      <TextInput 
        style={styles.input} 
        value={eventName} 
        placeholder="接下来要做的事……" 
        onChangeText={newText => setEventName(newText)}/>
      <Button title="开始" onPress={onEventStart}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
