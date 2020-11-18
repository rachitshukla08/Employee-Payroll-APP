let isUpdate = false;
let employeePayrollObj = {};

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
    updateSalary();
    checkForUpdate();
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
        this.id = params[7];
    }

    //getter and setter
    get id(){
        return this_id;
    }
    set id(id){
        this._id = id;
    }
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

function save(event){
    try{
        setEmployeePayrollObject();
    }catch(e){
        return;
    }
    alert(employeePayrollObj.toString());
    console.log(employeePayrollObj.toString());
    console.log(employeePayrollObj.department);

    if(employeePayrollObj.name!=undefined&&employeePayrollObj.startDate!=undefined)
        createAndUpdateStorage();
    employeePayrollObj = undefined;
}

function setEmployeePayrollObject(){
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
        console.log(employeePayrollObj);
        if(employeePayrollObj._id==undefined){
            let id = new Date().getTime();
            employeePayrollObj = new EmployeePayrollData(name,profileImage,gender,departments,salary,date,notes,id);
        }
        else {
            let id = employeePayrollObj._id;
            employeePayrollObj = new EmployeePayrollData(name,profileImage,gender,departments,salary,date,notes,id);
        }
    }
    catch(e){
        alert(e);
        alert("Please enter proper details");
        console.error(e);
    }
}

function createAndUpdateStorage(){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList!=undefined){
        let employeePayrollData = employeePayrollList.find(empData=>empData._id ==employeePayrollObj._id);
        console.log(employeePayrollData);
        if(!employeePayrollData){
            employeePayrollList.push(employeePayrollObj);
            console.log("PUSHED");
        } else {
            const index = employeePayrollList.map(empData=>empData._id).indexOf(employeePayrollData._id);
            employeePayrollList.splice(index,1,employeePayrollObj);
            console.log("SPLICED");
        }
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

const checkForUpdate = () =>{
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true :false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    console.log(employeePayrollObj);
    setForm();
}

const setForm = () =>{
    document.querySelector('#name').value = employeePayrollObj._name;
    setSelectedValues('[name=profile]',employeePayrollObj._image);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    document.querySelector("#salary").value = employeePayrollObj._salary;
    document.querySelector(".salary-output").textContent = employeePayrollObj._salary;
    document.querySelector('#notes').value = employeePayrollObj._notes;
    let date = stringifyDate(employeePayrollObj._startDate).split("/");
    document.querySelector('#day').value = date[0];
    document.querySelector('#month').value = date[1];
    document.querySelector('#year').value = date[2];
}

const stringifyDate = (date)=> {
    const options = {day: 'numeric', month: 'numeric', year:'numeric'};
    const newDate = !date ? "undefined":new Date(Date.parse(date)).toLocaleDateString('en-IN',options);
    return newDate;
}

const setSelectedValues = (propertyValue,value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value == value)
            item.checked = true;
    });
}
