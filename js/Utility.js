const stringifyDate = (date)=> {
    const options = {day: 'numeric', month: 'numeric', year:'numeric'};
    const newDate = !date ? "undefined":new Date(Date.parse(date)).toLocaleDateString('en-IN',options);
    return newDate;
}
const checkName = (name)=>{
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(!nameRegex.test(name)){
            throw "Name is incorrect "+name;
        }
}

const checkStartDate = (startDate) => {
    if(startDate.getTime()<=(new Date()).getTime()
        &&((((new Date()).getTime())-(startDate.getTime()))/(1000*60*60*24))<=30 ){
           }
        else{
            throw "Date is incorrect: "+startDate.toLocaleDateString("en-IN");
        }
}