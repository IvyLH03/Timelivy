export interface TimeblockType {
    start:number,
    end:number,
    primary_name:string,
    label:TimeblockLabelType[]
}

export interface TimeblockLabelType {
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