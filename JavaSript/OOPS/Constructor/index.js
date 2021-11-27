function createStudent(name,marks,rollNo){
    
    this.name = name;
    this.marks = marks;
    this.rollNo=rollNo;

}
var student3= new createStudent('zxcc',90,13);
console.log(student3);

function User(name) {
    this.isAdmin = false;
  }
  var user = new User("James");
  console.log(user);

  
    var user = User("Julie");
    console.log(user);


var obj = {};
function A() { return obj; }
function B() { return obj; }
console.log( new A() == new B() )