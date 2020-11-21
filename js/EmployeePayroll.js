//Employee Payroll Class
class EmployeePayrollData{
    id;
    //constructor
    constructor(...params){
        this.name = params[0];
        this.image = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.notes = params[6];
    }

    //getter and setter
    get name(){
        return this._name;
    }
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(name)){
            this._name = name;
        }
        else{ 
            alert("Incorrect name");
            throw "Name is incorrect"+name;
        }
    }
    get image(){
        return this._image;
    }
    set image(image){
        this._image = image;
    }
    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender; 
    }
    get department(){
        return this._department;
    }
    set department(department){
        this._department = department;
    }
    get salary(){
        return this._salary;
    }
    set salary(salary){
            this._salary = salary;
    }
    get startDate(){
        return this._startDate;
    }
    get notes(){
        return this._notes;
    }
    set notes(notes){
        this._notes = notes;
    }
    set startDate(startDate){
        if(startDate.getTime()<=(new Date()).getTime()
        &&((((new Date()).getTime())-(startDate.getTime()))/(1000*60*60*24))<=30 ){
            this._startDate = startDate;
           }
        else{
            alert("Incorrect date");
            throw "Date is incorrect: "+startDate.toLocaleDateString("en-IN");
        }
    }

    //toString
    toString(){
        const options = {year: 'numeric', month: 'numeric', day:'numeric'};
        const empDate = this.startDate == undefined ? "undefined":
                        this.startDate.toLocaleDateString("en-IN",options);
        return "Name = "+this.name +", Gender = "+this.gender+", Departments = "+this.department+", Salary = "+this.salary+", Start date = "+empDate;
    }
}
