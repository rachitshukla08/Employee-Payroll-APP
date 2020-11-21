function showTime(){
    const date = new Date();
    return date.getHours() +"Hrs:"+date.getMinutes() + "Mins:" +date.getSeconds()+"Secs";
}

function makeServicecall(methodType,url,async=true,data=null){
    return new Promise(function(resolve,reject){
        let xhr =  new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.readyState==4){
                if(xhr.status==200||xhr.status==201){
                    resolve(xhr.responseText);
                }
                else if(xhr.status >=400){
                    reject({
                        status: xhr.status,
                        statusText : xhr.statusText
                    });
                    console.log("XHR Failed");
                    console.log("Handle 400 Client Error or 500 Server Error at : "+showTime()); 
                }
            }
        }
        
        xhr.onerror = function(){
            reject({
                status: xhr.status,
                statusText : xhr.statusText
            });
        };

        xhr.open(methodType,url,async);
        if(data){
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else 
            xhr.send();
        console.log(methodType+" request sent to server at "+showTime());
    });
}