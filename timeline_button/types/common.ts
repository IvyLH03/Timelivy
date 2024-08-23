export interface Timeblock {
    start:number,
    end:number,
    primary_name:string,
    label:TimeblockLabel[]
}

export interface TimeblockLabel {
    name:string,
    is_private:boolean
}

export function emptyTimeblockFactory() {
    return {
        start:0,
        end:0,
        primary_name:"无记录",
        label:[]
    }
}