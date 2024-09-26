import React, {createContext} from "react";
import { TimeblockType } from "@/types/common";

export interface TimeblockDataContextType {
    timeblocks:TimeblockType[],
    saveTimeblocks: (newTimeblocks: TimeblockType[]) => void,
}

export const TimeblockDataContext = createContext<TimeblockDataContextType|undefined>(undefined)