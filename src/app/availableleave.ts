export class Availableleave {
    empId!:string;
    email!:string;
    role!:string;
    total!:number;
    sickLeave!:number;
    casualLeave!:number;
    earnedLeave!:number;

    setData(data:any){
        this.empId = data.empId;
        this.email = data.email;
        this.role = data.role;
        this.total = data.total;
        this.sickLeave = data.sickLeave;
        this.casualLeave = data.casualLeave;
        this.earnedLeave = data.earnedLeave;
    }
}
