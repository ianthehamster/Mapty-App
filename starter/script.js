'use strict';

/** OOP is programming paradigm (style of our code) that is based on the concept of objects
 * objects is used to model real-world (to-do items) or abstract features (data structure)
 * we pack all the data and corresponding behaviour all into one block when we use objects
 * Objects are self-contained pieces of code, which can be used as building blocks of our app and to interact with one another
 * interactions happen through APIs: methods that the code outside the object can access and use to communicate with the object
 */

// we use classes (blueprint that can be used to create new objects)

// all objects created through a class are "instances of the class" -> instances is an object that we can use in our code, which was created from our class

/** 4 fundamental principles to implement classes
 * 1. Abstraction
 * 2. Encapsulation
 * 3. Inheritance
 * 4. Polymorphism
 */

/** Abstraction ignores or hide details that don't matter */

/** Encapsulation keep some properties private inside the class so that they are not accessible from outside the class
 * prevents external data from manipulating internal properties/state
 * Some methods can be exposed as a public interface (API)
 */

/** Inheritance where we have two classes that are closely related and have one class inherit from the other
 * we have one parent and one child class where the child class extends the parent class
 * child class inherits all properties from its parent
 * inheritance makes all properties and methods of a certain class available to a child class (reuse common logic)
 * Note that a child class can have its own properties and methods
 */

/** Polymorphism where a child class can override a method it inherited from a parent class */

/** all objects are linked to a prototype object
 * prototype object contains methods and properties that can be used by other linked objects
 * This is known as prototypal inheritance
 * Object inherit methods and properties from prototype objects (instance inheriting from a class)
 * NOTE THIS IS DIFFERENT FROM INHERITANCE
 * Behaviour (methods) is delegated from objects to the linked prototype object
 */

// How do we implement OOP in Javascript in practice
/**
 * 1. Constructor function technique
 * 2. ES6 Classes
 * 3. Object.create()
 */

/** Constructor functions uses function which sets neew object's prototype (i.e., how maps and sets are implemented) */

/** ES6 Classes
 * more modern way of OOP but they are syntactic sugar (i.e., just a layer of abstraction over constructor functions)
 * implemented with constructor functions so they use prototypal inheritance
 */

/** object.create()
 * easiest way to link object to prototype object
 * defines prototypes manually
 * not commonly used
 */

// Constructor Functions and New Operator!

// Constructor is now blueprint for the house
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName; // note that property can be different from our parameter/arguments
  this.birthYear = birthYear;

  // NEVER CREATE METHOD INSIDE CONSTRUCTOR FUNCTION!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// Objects created here is the actual house (actual data in them)
const Jonas = new Person('Jonas', 1991); // new operator calls the Person function and also carried out 4 steps!

console.log(Jonas); // object with firstName: Jonas and birthYear: 1991

/** When we use the new
 * 1. New empty object {} is created
 
 * 2. Person function is called and in this function call, the this keyword will be set to the newly created object in the first step
 
 * this = {} (i.e., this keyword points to new object)

 * 3. New empty object {} is linked to prototype

 * 4. Object in step 1 is returned from constructor function (Person)
 */

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
// we created an object from a constructor function, which simulate classes (i.e., Jonas is an instance of Person -> objects are instances of classes)

console.log(Jonas instanceof Person); // true

const jay = 'Jay';
console.log(jay instanceof Person); // false

// Prototypes
/** every function, including constructor functions, has a property called prototype
 * Objects created by constructor functions will get access to all the methods and properties defined on prototype property
 */
console.log(Person.prototype); // this is not prototype of Person, but the prototype of all the objects created with the Person function (See line 121!)

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); // this keyword is always set to the object calling the method! (i.e., Jonas when we do Jonas,..calcAge()!)
};

Jonas.calcAge(); // we can now use calcAge() function even though we didn't even define it in the Jonas object earlier!
/* Jonas object inherited the method through prototypal inheritance
 * Any object always has access to methods and properties from its prototype
 * prototype of Jonas is Person.prototype
 */
console.log(Jonas.__proto__); // Output: prototype which contains the calcAge() function. Prototype of Jonas object is essentially the prototype property of the Person Constructor function
console.log(Jonas.__proto__ === Person.prototype); //Output: true

console.log(Person.prototype.isPrototypeOf(Jonas)); //Output: true as Person.prototype is prototype of Jonas (i.e., the objects)

console.log(Person.prototype.isPrototypeOf(Person)); // Output: false

Person.prototype.species = 'Hooman';
console.log(Jonas, matilda); // species will be accessed in the Prototype object of the jonas and matilda object
console.log(Jonas.species); // Hooman

console.log(Jonas.hasOwnProperty('firstName')); // true
console.log(Jonas.hasOwnProperty('species')); // false as the property, species, is not inside the Jonas object. Jonas simply has access to it because species is in the prototype property of Person!

// Prototypal Inheritance with built-in objects
console.log(Jonas.__proto__); // __proto__ === Person.prototype, which contains calcAge() and species property

//Object.prototype (top of prototype chain)
console.log(Jonas.__proto__.__proto__); // returns Object.prototype which is the last prototype in the prototype chain

console.log(Jonas.__proto__.__proto__.__proto__); // null as Object.prototype is the last in the prototype chain

console.log(Person.prototype.constructor); // points back to the Person function itself
console.dir(Person.prototype.constructor); // points back to Person

// Note: All functions are objects so they will have prototypes! Prototype itself is an object and thus it has its own prototype!

const arr = [3, 6, 4, 5, 6, 9, 3, 6, 9]; // new Array === []
console.log(arr.__proto__); // returns prototype of array that has all the available methods such as filter, push, pop etc. Thus, all arrays have access to all the methods through prototypal inheritance

console.log(arr.__proto__ === Array.prototype); // returns true as prototype property of the constructor === prototype of all objects created by that constructor

console.log(arr.__proto__.__proto__); // returns Object.prototype

// we can add our own methods/properties to the Array object!
Array.prototype.unique = function () {
  return [...new Set(this)];
};
/** we added a new method to the prototype property of the array constructor and thus, all arrays, such as arr, will inherit this method and we can then call that method, unique, on any array we want */
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); //returns the object of the h1 element -> Prototype is a HTMLHeading Element! -> Prototype is a HTMLElement -> ... -> Object.prototype (the final stage in the Prototype Chain)

console.dir(x => x + 1); // function is an object so x function has a prototype which contains methods we can use on functions

// Coding Challenge #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car('BMW', 110);
const mercedes = new Car('Mercedes', 105);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed}kmh`);
};

Car.prototype.brake = function () {
  this.speed = this.speed - 10;
  console.log(`${this.make} going at ${this.speed}kmh`);
};

console.log(bmw);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();

mercedes.brake();

// Jonas' solution
const CarJonas = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarJonas.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarJonas.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmwJonas = new CarJonas('BMW', 120);
const mercedesJonas = new CarJonas('Mercedes', 95);

bmwJonas.accelerate();
bmwJonas.accelerate();
bmwJonas.brake();
bmwJonas.accelerate();

// bmw and mercedes objects contains the state of the car (i.e., make and speed) and the functionality to manipulate its own data by inheriting the accelerate and brake methods from the CarJonas constructor function

// ES6 Classes

// class expression
const PersonClEx = class {};

// class declaration
class PersonClDel {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Methods will be added to .prototype property of the PersonClDel class, which is the prototype of the objects created (i.e., james)
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  farewell() {
    console.log(`Goodbye ${this.firstName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    // we add _ to fullName to avoid naming conflict between constructor and setter function
    else alert(`${name} is not a full name`);
    /** we create setter for property fullName that already exists
     * each time we set the fullName of the object on the this keyword, the method fullName will be executed
     * fullName parameter becomes name parameter in fullName method
     */
  }

  get fullName() {
    return this._fullName;
  } // sets the fullName property to avoid conflicting with _fullName

  // Static method
  static hey() {
    console.log('Hey there!');
    console.log(this);
  }
}

/** Note that classes are just a special type of function
 * that is why we have class expression and class declaration
 * All of the methods in class and not in the constructor will be on the prototype of the objects created, not on the objects itself (prototypal inheritance)
 */
const james = new PersonClDel('James Davis', 1996); // 'new' instance calls constructor and returns a new object, james
console.log(james); // calcAge() is in the prototype of the object and not in the james object
james.calcAge();
console.log(james.age); // 41

console.log(james.__proto__ === PersonClDel.prototype); // true

PersonClDel.prototype.greet = function () {
  console.log(`Hey ${this.firstName}!`);
}; // we can also add other methods to the PersonClDel class prototype, similar to adding farewell method in the class

james.greet();
james.farewell();

const walter = new PersonClDel('Walter White', 1965);

/** Note:
 * 1. Classes are NOT hoisted, unlike function declarations
 * 2. Classes, like functions, are first class citizens (i.e., we can pass them into functions and also return them from functions)
 * 3. Classes are executed in strict mode.
 */

// Getters and Setters (all objects have them)
/** Getters and Setters are functions that get and set a value */

const account = {
  owner: 'jonas',
  movements: [1200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop(); // since slice(-1) takes the last element into an array, we use the pop() method to destructure the array
  },

  set latest(mov) {
    /// set has to have at least 1 parameter
    this.movements.push(mov);
  },
};

console.log(account.latest); // 300. Note that we dont call this method with ()

account.latest = 50; // no need to call the method with latest(50)
console.log(account.movements); // [1200, 530, 120, 300, 50]

// Static Methods (not added to the prototype property)
Person.hey = function () {
  console.log('Hey there!');
  console.log(this); // constructor function
};

Person.hey(); // Note we cannot call hey() in Jonas or matilda objects as they are not in the object prototypes!

PersonClDel.hey();

// Object.create()
/** no prototype properties, no new operator and no constructor functions
 * we use Object.create() to manually set the prototype of an object to any other object we want
 */
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }, // not constructor as we are not using 'new' operator to call this!
};

// Object.create() creates new object, steven, and steven prototype is PersonProto!
const steven = Object.create(PersonProto); // return new object, Steven, that is linked to the prototype passed into PersonProto
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__); // returns PersonProto since we set PersonProto prototype to steven
console.log(steven.__proto__ === PersonProto); // true

// alternative way of setting properties
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // we explicitly called init on Sarah, no 'new' operator!
sarah.calcAge();

// getter and setter

// why we use this._ instead of this. in getters and setters
class Example {
  constructor() {
    this._privateProperty = 787085;
    this.publicProperty = 'Hello';
  }

  get privatePropertyIan() {
    return this._privateProperty;
  }

  set privatePropertyIan(newValue) {
    this._privateProperty = newValue;
  }
}

const instance = new Example();

console.log(instance.publicProperty); // Output: "Hello"

console.log(instance.privatePropertyIan); // Output: 787085 as we use the getter to access the private property

// we can change the public property by simply accessing it through the constructor
instance.publicProperty = 'World';
console.log(instance.publicProperty);

// to change the private property on the object, we can use the setter
instance.privatePropertyIan = 6156;
console.log(instance.privatePropertyIan);

/** this._privateProperty helps differentiate between public properties (which can be accessed directly) and private properties (which should be access through getters and setters) */

// getters and setters Practical Example

class BankAccount {
  constructor(accountNumber, balance) {
    this._accountNumber = accountNumber;
    this._balance = balance;
  }

  // Getter for accountNumber
  get accountNumber() {
    return this._accountNumber;
  }

  set accountNumber(newNumber) {
    this._accountNumber = newNumber;
  }

  // Getter for balance
  get balance() {
    return this._balance;
  }

  // Setter for balance
  set balance(newBalance) {
    if (newBalance >= 0) {
      this._balance = newBalance;
    } else {
      console.log('Invalid balance. Balance cannot be negative');
    }
  }

  // Method to deposit money into the account
  deposit(amount) {
    this._balance += amount;
    console.log(`$${amount} deposited. New balance: $${this._balance}`);
  }

  // Method to withdraw mone from the account
  withdraw(amount) {
    if (amount <= this._balance) {
      this._balance -= amount;
      console.log(`$${amount} withdrawn. New balance: $${this._balance}`);
    } else {
      console.log('Insufficient balance');
    }
  }
}

// Creating an instance of the BankAccount class
const accountIan = new BankAccount('0452583508', 69420);

accountIan.newNumber = '999';
console.log(accountIan.newNumber);

accountIan.balance = 49620;
console.log(accountIan.balance);

// remember that deposit and withdraw are functions and thus we need to call them using parentheses ()
accountIan.deposit(888);

class Car3 {
  constructor(make, speed) {
    this._make = make;
    this._speed = speed;
  }

  get speedUS() {
    return this._speed / 1.6;
  } // transformed method to property called speedUS

  set speedUS(speed) {
    this._speed = speed * 1.6;
  }

  // Accelerate method
  accelerate() {
    this._speed += 10;
    console.log(`${this._make} is going at ${this._speed} miles per hour`);
  }

  // Brake method
  brake() {
    this._speed -= 10;
    console.log(`${this._make} is going at ${this._speed} miles per hour`);
  }
}

const ford = new Car3('Ford', 120);

console.log(ford.speedUS); // Output:
ford.accelerate();
ford.brake();

// Using the setter
ford.speedUS = 50;
console.log(ford);

// Inheritance between 'Classes': Constructor Functions
const PersonInheritance = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonInheritance.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  PersonInheritance.call(this, firstName, birthYear);
  // call method's first argument should be the object on which the function is invoked (in this case, the 'this' value)
  this.course = course;
};
// Remember in regular function calls (i.e., PersonInheritance(), the this keyword is set to undefined.)

/** the call method is used to invoke the PersonInheritance constructor function within the context of the Student object.
 
 * by passing 'this' as the first argument, it ensures that PersonInheritance function initializes the properties (firstName and birthYear) on the Student object being created,

 * call(this, ...) explicitly sets the 'this' value inside the PersonInheritance function to the Student object, ENABLING PROPERTIES TO BE ASSIGNED TO STUDENT (INHERITANCE)
 */

// Linking prototypes
Student.prototype = Object.create(PersonInheritance.prototype); // Object.create() returns an empty object and thus we can then add the introduce method below. ALWAYS USE OBJECT.CREATE BEFORE ADDING ANY METHODS

/** DO NOT USE Student.prototype = Person.prototype as this makes both prototypes point to the same object in memory (any modifications made to Student.prototype will be reflected in Person.prototype)
 
 * USE Student.prototype = Object.create(Person.prototype) as it creates a new object that inherits from Person.prototype (passed as the argument) and sets it as the prototype of Student. 
 */

// adding the introduce method
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2012, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // true as Student is constructor function of mike
console.log(mike instanceof PersonInheritance); // true as Object.create() establishes the prototype chain where Student will have PersonInheritance.prototype in their prototype chain
console.log(mike instanceof Object); // true as

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

function PersonGPT(name) {
  this.name = name;
}

function StudentGPT(name, studentID) {
  PersonGPT.call(this, name);
  this.studentID = studentID;
}

StudentGPT.prototype = Object.create(PersonGPT.prototype);

const bill = new StudentGPT('Bill', 12345);

// Coding Challenge #3

const Car4 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const ElectricCar = function (make, speed, charge) {
  Car4.call(this, make, speed);
  this.charge = charge;
};

ElectricCar.prototype = Object.create(Car4.prototype);

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

ElectricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new ElectricCar('Tesla', 120, 23);

tesla.accelerate();
tesla.chargeBattery(69);
tesla.accelerate();
tesla.accelerate();

// Jonas Solution
const CarJonas3 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarJonas3.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarJonas3.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  CarJonas3.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(CarJonas3.prototype);
// We want the prototype property of EV to inherit from the prototype property of CarJonas3 so we use Object.create() to manually link them

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}%`
  );
};

const teslaJonas = new EV('Tesla', 120, 23);
teslaJonas.chargeBattery(90);
console.log(teslaJonas);
teslaJonas.brake();
teslaJonas.accelerate();

// Note that CarJonas3 and the Object both have 2 accelerate methods

// when there are 2 methods with the same name in the prototype chain, the first one that appears in the chain will be used, similar to the scope chain!
// a child class can override a parent class if both have the same methods

class PersonCl2 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  farewell() {
    console.log(`Goodbye ${this.fullName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    // we add _ to fullName to avoid naming conflict between constructor and setter function
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  } // sets the fullName property to avoid conflicting with _fullName

  // Static method
  static hey() {
    console.log('Hey there!');
    console.log(this);
  }
}

// Inheritance between ES6 Classes
/** we need extend keyword and super function */
class StudentCl2 extends PersonCl2 {
  // 'extend' links prototype behind the scenes
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);

    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // using polymorphism, we override the parent class calcAge method with this child calcAge method!
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// super is constructor function of parent class and is responsible for creating this keyword in sub class

const martha = new StudentCl2('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
martha.farewell();

// Inheritance between Classes: Object.create()
const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const jason = Object.create(PersonProto1);

const StudentProto1 = Object.create(PersonProto1);
// we can use StudentProto1 to create new students now that we have linked the prototypes of StudentProto1 with PersonProto1
StudentProto1.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto1.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const kay = Object.create(StudentProto1); // StudentProto1 is prototype of the kay object -> PersonProto1 object is the prototype of StudentProto1

// PersonProto1 is parent prototype of kay -> kay is now in the prototype chain!
kay.init('Kay', 2010, 'Computer Science');
kay.introduce();
kay.calcAge();

/** Fields are like properties on instances
 * 1. Public Fields
 * 2. Private Fields
 * 3. Public Methods
 * 4. Private Methods
 
  there is also the static versions!
 * 
 */

class Account {
  // 1. Public Fields (instances)
  locale = navigator.language; // Don't forget the semi-colon!

  // 2. Private Fields
  #movements = []; // # makes the field private and can no longer be read in the console.log
  #pin; // set to undefined until the constructor function!

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Protected property
    this.#pin = pin; // _ is a naming convention to say this property is private
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3. Public Methods

  // Public Interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // returns the value of the current object so we can chain methods!
  }

  // Abstracts (removes) the '-' negative sign away from the parameter
  withdraw(val) {
    this.deposit(-val);
    // we can call other methods inside methods in classes
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved!`);
      return this;
    }
  }

  // static methods are not available on instances but on class itself
  static helper() {
    console.log('Helper');
  }

  // 4. Private Methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Ian', 'AUD', 1111);

// we can use the public interface to call deposit and withdraw methods
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Don't manually add elements to movements array. We should use methods on the movement properties instead such as deposit and withdraw!
// acc1._movements.push(250);
// acc1._movements.push(-140);

// the _ in _movements tells the other team of devs that this property is private and not meant to be accessed outside of the class Account!

/** Methods in Account class are added to the prototype
 *  Public Fields are on instances
 */

Account.helper();

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000); // we used {return this} in the methods listed here to return a value that we can then call the chained methods on each other
console.log(acc1.getMovements());

class PersonTest {
  constructor(name) {
    this._name = name;
  }

  get nameLol() {
    return this._name;
  }
}

const putin = new PersonTest('Vladimir');
console.log(putin.nameLol);

class PersonTest2 {
  constructor(name, birthYear) {
    this._name = name;
    this._birthYear = birthYear;
  }

  get birthYearASAP() {
    return this._birthYear;
  }

  set birthYearPls(birthYear) {
    this._birthYear = birthYear;
  }
}

const miles = new PersonTest2('Miles', 2006);
console.log(miles.birthYearASAP);

miles.birthYearPls = 2008;
console.log(miles.birthYearASAP);

// Coding Challenge 4
class CarCl {
  constructor(make, speed) {
    this._make = make;
    this._speed = speed;
  }

  get speedUS() {
    return this._speed / 1.6;
  } // transformed method to property called speedUS

  set speedUS(speed) {
    this._speed = speed * 1.6;
  }

  // Accelerate method
  accelerate() {
    this._speed += 10;
    console.log(`${this._make} is going at ${this._speed} miles per hour`);
    return this;
  }

  // Brake method
  brake() {
    this._speed -= 10;
    console.log(`${this._make} is going at ${this._speed} miles per hour`);
  }
}

class EVCL extends CarCl {
  #charge = 0;
  constructor(make, speed) {
    super(make, speed);
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  brake() {
    this._speed -= 5;
    this.#charge -= 1;
    console.log(
      `${this._make} is going at ${this._speed} km/h with a charge of ${
        this.#charge
      }%`
    ); // don't forget the _ in this._make and this._speed as it is named that in the Parent class
    return this;
  }
}

const rivian = new EVCL('Rivian', 120);
rivian.chargeBattery(23);
rivian.brake();
rivian.accelerate().brake().chargeBattery(50).brake();

// Jonas' Solution
class CarClJonas {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} miles per hour`);
    return this;
  }

  brake() {
    this.speed -= 10;
    console.log(`${this.make} is going at ${this.speed} miles per hour`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCLJonas extends CarClJonas {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivianJonas = new EVCLJonas('Rivian', 120, 23);
console.log(rivianJonas);

rivianJonas
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivianJonas.speedUS);
