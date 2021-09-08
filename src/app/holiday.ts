export class Holiday {
    _id!:string;
    _rev!:string;
    date!:string;
    day!:string;
    status!:string;

    setData(holidayObject: any){
        this.date = holidayObject.date;
        this.day = holidayObject.day;
        this.status = holidayObject.status;
    }
}
