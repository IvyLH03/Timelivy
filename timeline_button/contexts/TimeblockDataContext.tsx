import React, {createContext} from "react";
import { TimeblockType, TimeblockLabelType } from "@/types/common";

export interface TimeblockDataContextType {
    timeblocks:TimeblockType[],
    currentTimeblock:TimeblockType | undefined,
    saveCurrentTimeblock: (current:TimeblockType) => void,
    labels:TimeblockLabelType[],
}

export const TimeblockDataContext = createContext<TimeblockDataContextType|undefined>(undefined)