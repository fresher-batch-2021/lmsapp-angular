export class Leave {
    name!:string;
    employeeId!:string;
    role!:string;
    fromDate!:Date;
    toDate!:Date;
    days!:number;
    leaveType!:string;
    reason!:string;
    status!:string;
    remarks!:string;

    setData(leaveData:any){
        this.name = leaveData.name;
        this.employeeId = leaveData.employeeId;
        this.role = leaveData.role;
        this.fromDate = leaveData.fromDate;
        this.toDate = leaveData.toDate;
        this.days  = leaveData.days;
        this.leaveType = leaveData.leaveType;
        this.reason = leaveData.reason;
        this.status = leaveData.status;
        this.remarks = leaveData.remarks;
    }
}