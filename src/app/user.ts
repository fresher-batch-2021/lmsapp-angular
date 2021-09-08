export class User {
    _id!:string;
    _rev!:string;
    name!:string;
    empId!:string;
    role!:string;
    mobileNumber!:string;
    email!:string;
    password!:string;
    status!:string;

    setData(formData:any){
        this.name = formData.name;
        this.empId = formData.empId;
        this.role = formData.role;
        this.mobileNumber = formData.mobileNumber;
        this.email = formData.email;
        this.password = formData.password;
        this.status = formData.status;
    }
}

