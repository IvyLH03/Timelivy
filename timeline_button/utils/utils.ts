import AsyncStorage from "@react-native-async-storage/async-storage"

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