import React, {createContext} from "react";
import { Timeblock, TimeblockLabel } from "@/types/common";

export interface TimeblockDataContextType {
    timeblocks:Timeblock[],
    currentTimeblock:Timeblock | undefined,
    saveCurrentTimeblock: (current:Timeblock) => void,
    labels:TimeblockLabel[],
}

export const TimeblockDataContext = createContext<TimeblockDataContextType|undefined>(undefined)