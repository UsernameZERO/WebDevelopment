console.log("hello");

console.log(process.argv);

function add(a,b){
    return a + b ;
}

var args =  process.argv.slice(2);
console.log("Adding the numbers :", add(parseInt(args[0]), parseInt(args[1])));