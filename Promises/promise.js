
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