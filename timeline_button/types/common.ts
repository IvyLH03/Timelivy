export interface TimeblockType {
    start:number,
    end:number,
    event:string,
    description:string
}

export function emptyTimeblockFactory() {
    return {
        start:0,
        end:0,
        primary_name:"无记录",
        label:[]
    }
}