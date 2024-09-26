import AsyncStorage from "@react-native-async-storage/async-storage"
import { TimeblockType } from "@/types/common"

export const formatTimeInterval = (seconds: number): string => {
    let hours: number = Math.floor(seconds / 3600)
    let minutes: number = Math.floor(seconds % 3600 / 60)
    let remainingSeconds: number = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export const storeData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};

export const updateTimeblockRemote = async (timeblock: TimeblockType) => {
    let res = await fetch(`http://localhost:3000/timeline?id=${timeblock.id}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(timeblock)
    })
    if(!res.ok) {
        return "something went wrong"
    }
    else {
        let data = await res.json()
        return data
    }
}

export const getAllTimeblockRemote = async () => {
    let res = await fetch("http://localhost:3000/timeline", {
        method: "GET"
      })
    if(!res.ok) {
        console.log("something went wrong")
        return []
    }
    let data = await res.json()
    return data
}

export const postTimeblockRemote = async (timeblock: TimeblockType) => {
    let res = await fetch("http://localhost:3000/timeline", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(timeblock)
    })
    if(!res.ok) {
        console.log("something went wrong")
        return -1
    }
    let data = await res.json()
    return data.id
}