let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const createInnerHtml = () => {
    if(empPayrollList.length==0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"
                        +"<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    //let employeePayrollList = createEmployeePayrollJSON();
    for(const employeePayrollData of empPayrollList){
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePic}">
        </td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${stringifyDate(employeePayrollData._date)}</td>
        <td>
            <img id="${employeePayrollData.id}" onclick="remove(this)" alt="remove"
                src="../assets/icons/delete-black-18dp.svg">
            <img id="${employeePayrollData.id}" alt="edit" onclick="update(this)" 
                src="../assets/icons/create-black-18dp.svg">
        </td>
        </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class = 'dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const getEmployeePayrollDataFromStorage = () => {
    console.log(localStorage.getItem('EmployeePayrollList'));
    return localStorage.getItem('EmployeePayrollList')?
                                JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const remove = (node) => {
    console.log(node.id);
    let employeePayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!employeePayrollData) 
        return;
    const index = empPayrollList.map(empData=>empData.id)
                                .indexOf(employeePayrollData.id);
    console.log(index);
    empPayrollList.splice(index,1);
    localStorage.setItem('EmployeePayrollList',JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
}

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) 
        return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}

