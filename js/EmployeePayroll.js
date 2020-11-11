function updateSalary(){
    const salary = document.querySelector('#salary');
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        console.log(salary);
        output.textContent = salary.value;
    });
}
