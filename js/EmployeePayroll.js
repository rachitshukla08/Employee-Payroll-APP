window.addEventListener("DOMContentLoaded",(event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector(".text-error");         
    name.addEventListener('input',function(){
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
        if(nameRegex.test(name.value)||name.value.length==0)
            textError.textContent="";
        else 
            textError.textContent="Name is invalid";
        });

    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let dateError = document.querySelector(".date-error");    
    day.addEventListener('click',checkDate);
    month.addEventListener('click',checkDate);
    year.addEventListener('click',checkDate);
    function checkDate(){
        let dateString = year.value+"-"+month.value+"-"+day.value+"T00:00:00Z";
        date = new Date(dateString);
        console.log(date);
        if(date.getTime()<=(new Date()).getTime()
        &&((((new Date()).getTime())-(date.getTime()))/(1000*60*60*24))<=30 ){
            dateError.textContent = "";
        }
        else 
            dateError.textContent="Date is invalid";
    }
});

function updateSalary(){
    const salary = document.querySelector('#salary');
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
}
//Employee Payroll Class
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
    try{
        employeePayrollData = new EmployeePayrollData(name,profileImage,gender,departments,salary,date,notes);
    }
    catch(e){
        alert("Please enter proper details");
        console.error(e);
    }
    alert(employeePayrollData.toString());
    console.log(employeePayrollData.toString());
    console.log(employeePayrollData.department);

    if(employeePayrollData.name!=undefined&&employeePayrollData.startDate!=undefined)
        createAndUpdateStorage(employeePayrollData);
        
    employeePayrollData = undefined;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    document.querySelector("#name").value = "";
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    document.querySelector(".salary-output").textContent=400000;
    document.querySelector("#day").value = 01;
    document.querySelector("#month").value = 01;
    document.querySelector("#year").value = 2020;
    document.querySelector("#notes").value= "";
    document.querySelector(".date-error").textContent = "";
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked = false;
    });
}
