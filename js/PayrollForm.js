let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener("DOMContentLoaded",(event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector(".text-error");         
    name.addEventListener('input',function(){
    let nameRegex = RegExp("^[A-Z]{1}[A-Za-z\\s]{2,}$");
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

function save(event){
    try{
        setEmployeePayrollObject();
    }catch(e){
        console.log(e);
        return;
    }
    console.log(employeePayrollObj);
    console.log(employeePayrollObj._department);
    console.log(employeePayrollObj._date);
    if(employeePayrollObj._name!=undefined&&employeePayrollObj._date!=undefined){
        console.log(employeePayrollObj);
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
        }else 
            createOrUpdateEmployeePayroll();
    }
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
            checkName(name);
            checkStartDate(date);
            employeePayrollObj._name = name;
            employeePayrollObj._profilePic = profileImage;
            employeePayrollObj._gender = gender;
            employeePayrollObj._department = departments;
            employeePayrollObj._salary = salary;
            employeePayrollObj._date = date;
            employeePayrollObj._note = notes;
            if(!isUpdate&&site_properties.use_local_storage.match("true")){
                employeePayrollObj.id = createNewEmployeeId();
            }
            console.log(employeePayrollObj);
        }
        catch(e){
            alert(e);
            alert("Please enter proper details");
            console.error(e);
        }
    
}

const createNewEmployeeId = ()=>{
    let empId = new Date().getTime();
    return empId;
}
const createOrUpdateEmployeePayroll = () =>{
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        alert("Updating to server");
        methodCall = "PUT";
        postURL = postURL + employeePayrollObj.id.toString();
    } else  alert("Adding to server");
    makeServicecall(methodCall,postURL,true,employeePayrollObj)
        .then(responseText => {
                resetForm();
                window.location.replace(site_properties.home_page);
            })
        .catch(error=>{
                alert(error);
                throw error;
    });
}

function createAndUpdateStorage(){
    alert("Updating storage");
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    console.log(employeePayrollObj);
    if(employeePayrollList!=undefined){
        let employeePayrollData = employeePayrollList.find(empData=>empData.id ==employeePayrollObj.id);
        console.log(employeePayrollData);
        if(!employeePayrollData){
            employeePayrollList.push(employeePayrollObj);
            console.log("PUSHED");
        } else {
            const index = employeePayrollList.map(empData=>empData.id).indexOf(employeePayrollData.id);
            employeePayrollList.splice(index,1,employeePayrollObj);
            console.log("SPLICED");
        }
    }
    else{
        employeePayrollList = [employeePayrollObj];
    }
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
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    document.querySelector("#salary").value = employeePayrollObj._salary;
    document.querySelector(".salary-output").textContent = employeePayrollObj._salary;
    document.querySelector('#notes').value = employeePayrollObj._note;
    let date = stringifyDate(employeePayrollObj._date).split("/");
    if(parseInt(date[0])<10)
        date[0] = "0"+date[0];
    console.log(date);
    document.querySelector('#day').value = date[0];
    document.querySelector('#month').value = date[1];
    document.querySelector('#year').value = date[2];
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
