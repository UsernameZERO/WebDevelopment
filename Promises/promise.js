
// var promise = new Promise((resolve,reject)=>{

//     setTimeout(()=>{
//         resolve();
//     },1000)
// })
// promise.then(()=>{
//     console.log("successful");
// })


var userLoggedIn = false;
var promise = new Promise((resolve,reject)=>{
//Wait for 1 sec
    setTimeout(()=>{
        //promise is resolved
       if(userLoggedIn) resolve();
       // promise is rejected
       else reject();
    },1000)
})
promise.then(()=>{
    console.log("successfully logged");
}).catch(()=>{console.log("Not logged");})

// we can write in other way around by taking ina func

function userCheckedIn(){
    var promise1 = new Promise((resolve,reject)=>{

        setTimeout(() => {
            if(userLoggedIn) resolve("logged in");
            else reject();
        }, 500);
    });
    return promise1;
}

userCheckedIn().then((successful)=>{
    console.log(successful);
}).catch(()=>{
    console.log("Not logged");
})