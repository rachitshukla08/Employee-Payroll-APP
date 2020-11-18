const stringifyDate = (date)=> {
    const options = {day: 'numeric', month: 'numeric', year:'numeric'};
    const newDate = !date ? "undefined":new Date(Date.parse(date)).toLocaleDateString('en-IN',options);
    return newDate;
}