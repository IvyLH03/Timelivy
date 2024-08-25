import React, {createContext} from "react";
import { TimeblockType, TimeblockLabelType } from "@/types/common";

export interface TimeblockDataContextType {
    timeblocks:TimeblockType[],
    currentTimeblock:TimeblockType | undefined,
    updateCurrentTimeblock: (current:TimeblockType) => void,
    labels:TimeblockLabelType[],
    saveCurrentTimeblock: () => void,
}

export const TimeblockDataContext = createContext<TimeblockDataContextType|undefined>(undefined)