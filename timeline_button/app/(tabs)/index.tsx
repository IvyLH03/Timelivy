import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useContext, useEffect, useState } from 'react';
import { TimeblockDataContext, TimeblockDataContextType } from '@/contexts/TimeblockDataContext';
import { emptyTimeblockFactory, TimeblockType } from '@/types/common';

export default function TabOneScreen() {
  const timeblockDataContext = useContext(TimeblockDataContext) as TimeblockDataContextType

  const {timeblocks, currentTimeblock, updateCurrentTimeblock, saveCurrentTimeblock, labels} = timeblockDataContext 

  const [eventName, setEventName] = useState<string>("")
  const [eventTimeLasting, setEventTimeLasting] = useState<number>(0)

  const onEventStart = () => {
    // add old timeblock to timeline with updated end time
    if(currentTimeblock) {
      updateCurrentTimeblock({
        ...currentTimeblock, end: Date.now()
      })
      saveCurrentTimeblock()
    }

    // create a new current timeblock
    updateCurrentTimeblock({
      primary_name:eventName,
      start: Date.now(),
      end:0,
      label:[]
    })

    // clear TextInput text
    setEventName("")

    // update event timer
    setEventTimeLasting(0)
  }

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
  }, [currentTimeblock])

  const formatTime = (seconds:number):string => {
    let hours:number = Math.floor(seconds / 3600)
    let minutes:number = Math.floor(seconds % 3600 / 60)
    let remainingSeconds:number = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>记录</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {
        currentTimeblock?
        <>
          <Text>目前正在做：{currentTimeblock?.primary_name}</Text>
          <Text>已经做了：{formatTime(eventTimeLasting)}</Text>
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
