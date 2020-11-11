function updateSalary(){
    const salary = document.querySelector('#salary');
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
}

class EmployeePayrollData{
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
        else throw 'Name is incorrect: '+name;
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
        let genderRegex = RegExp("^[MF]$");
        if(genderRegex.test(gender))
            this._gender = gender;
        else throw "Gender incorrect: "+gender+". Choose M or F";
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
        let salaryRegex = RegExp("^[1-9][0-9]{0,}$");
        if(salaryRegex.test(salary))
            this._salary = salary;
        else throw 'Salary is incorrect: '+salary;
    }
    
    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        if(startDate.getMonth()<=(new Date()).getMonth()
           &&startDate.getDay()<=(new Date()).getDay()
           &&startDate.getFullYear()<=(new Date()).getFullYear())
            this._startDate = startDate;
        else throw "Date is incorrect: "+startDate.toLocaleDateString("en-IN");
    }

    //toString
    toString(){
        const options = {year: 'numeric', month: 'numeric', day:'numeric'};
        const empDate = this.startDate == undefined ? "undefined":
                        this.startDate.toLocaleDateString("en-IN",options);
        return "Name = "+this.name +",gender = "+this.gender+",departments = "+this.department+",salary = "+this.salary+",start date = "+empDate;
    }
}

function save(){
    //name
    const name = document.querySelector("#name").value;

    //profile image
    const images = document.getElementsByName("profile");
    let profileImage=images[0];
    for(let i=0;i<images.length;i++){
        if(images[i].checked)
            profileImage=images[i].value;
    }

    //gender
    let genders = document.getElementsByName("gender");
    for(let i=0;i<genders.length;i++){
        if(genders[i].checked)
            gender=genders[i].value;
    }

    //departments
    let departments = new Array();
    const departmentsForm = document.getElementsByClassName("checkbox");
    for(let i=0;i<departmentsForm.length;i++){
        if(departmentsForm[i].checked)
            departments.push(departmentsForm[i].value);
    }
    
    //salary
    const salary = document.querySelector("#salary").value;

    //start date
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    let dateString = year+"-"+month+"-"+day+"T00:00:00Z";
    date = new Date(dateString);

    //notes
    const notes = document.getElementById("notes").value;

    let employeePayrollData = new EmployeePayrollData(name,profileImage,gender,departments,salary,date,notes);
    console.log(employeePayrollData.toString());
    console.log(employeePayrollData.department);
}
