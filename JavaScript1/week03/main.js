// Task 01. Strings
let myString = 'hello,this,is,a,difficult,to,read,sentence';
console.log(myString);
console.log(myString.length);
myString = myString.split(',').join(' ');
console.log(myString);

// Task 02. Arrays
let favoriteAnimals = ['blowfish', 'capricorn', 'giraffe'];
const MAUROS_FAVORITE_ANIMAL = 'turtle';

favoriteAnimals.push(MAUROS_FAVORITE_ANIMAL);
console.log(favoriteAnimals);

const JIMS_FAVORITE_ANIMAL = 'meerkat';
favoriteAnimals.splice(1, 0, JIMS_FAVORITE_ANIMAL);

console.log(
  `The new value of array will be:\
  ['blowfish', 'meerkat', 'capricorn', 'giraffe', 'turtle']`,
);
console.log(favoriteAnimals);
console.log('The array has a length of: ' + favoriteAnimals.length);

favoriteAnimals.splice(favoriteAnimals.length - 2, 1);
console.log(favoriteAnimals);

const MEERKAT_INDEX = favoriteAnimals.indexOf('meerkat');
console.log('The item you are looking for is at index: ' + MEERKAT_INDEX);

// More Javascript
// 1. Create a function that takes 3 arguments and returns the sum of the these arguments.
function sumThreeNumbers(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThreeNumbers(4, 7, 10));
console.log(sumThreeNumbers(567, 0, 18));
console.log(sumThreeNumbers(9, 3, -20));

// 2. Create a function named colorCar that receives a color,
// and prints out, 'a red car' for example.
function colorCar(color) {
  return console.log(`a ${color} car`);
}

colorCar('blue');
colorCar('black');
colorCar('green');

// 3. Create an object and a function that takes the object as a parameter
// and prints out all of its properties and values.
const USER = {
  id: 1,
  name: 'admin',
  email: 'admin@email.com',
  admin: true,
};

function printObjectPropertiesAndValues(object) {
  for (key in object) {
    console.log(`${key}: ${object[key]}`);
  }
}

printObjectPropertiesAndValues(USER);

// 4. Create a function named vehicleType that receives a color, and a code, 1 for car, 2 for motorbike.
// And prints 'a blue motorbike' for example when called as vehicleType("blue", 2)
function vehicleType(color, code) {
  const VEHICLE_TYPES = ['car', 'motorbike'];
  const VEHICLE_TYPE = VEHICLE_TYPES[code - 1];

  // Edge values and types check
  if (typeof color !== 'string' || typeof code !== 'number') {
    console.log('Invalid input');
    return;
  }

  if (code < 1 || code > VEHICLE_TYPES.length) {
    console.log(`Unknown vehicle type. Enter number from 1 to ${VEHICLE_TYPES.length}`);
    return;
  }
  console.log(`a ${color} ${VEHICLE_TYPE}`);
}

vehicleType('yellow', 1); // a yellow car
vehicleType('blue', 0); // Unknown vehicle type. Enter number from 1 to 2
vehicleType('white', 2); // a white motorbike
vehicleType(true, NaN); // Invalid input
vehicleType(1, 3); // Invalid input

// 5. Write statement in one line
console.log(3 === 3 ? 'yes' : 'no');

// 6. Create a function called vehicle, like before, but takes another parameter called age,
// so that vehicle("blue", 1, 5) prints 'a blue used car'
function vehicle(color, code, age) {
  const VEHICLE_TYPES = ['car', 'motorbike'];
  const CAR_CONDITIONS = ['new', 'used'];

  let carCondition = age > 1 ? CAR_CONDITIONS[1] : CAR_CONDITIONS[0];
  const VEHICLE_TYPE = VEHICLE_TYPES[code - 1];

  // Edge values and types check
  if (typeof color !== 'string' || typeof code !== 'number' || typeof age !== 'number') {
    console.log('Invalid input');
    return;
  }

  if (code < 1 || code > VEHICLE_TYPES.length) {
    console.log(`Unknown vehicle type. Enter number from 1 to ${VEHICLE_TYPES.length}`);
    return;
  }
  console.log(`a ${color} ${carCondition} ${VEHICLE_TYPE}`);
}

vehicle(4565, true, 'test'); // Invalid input
vehicle('blue', 5, 3); // Unknown vehicle type. Enter number from 1 to 2
vehicle('blue', 1, 1); // a blue new car
vehicle('white', 2, 5); // a white used motorbike

// 7. Make a list of vehicles, you can add "motorbike", "caravan", "bike", or more.
let vehiclesList = ['motorbike', 'caravan', 'bike', 'scooter', 'skate'];

// 8. How do you get the third element from that list?
console.log(`Third element from list is: ` + vehiclesList[2]);

// 9. Change the function vehicle to use the list of question 7.
function vehicleUpdated(color, code, age) {
  const CAR_CONDITIONS = ['new', 'used'];
  const VEHICLE_TYPE = vehiclesList[code - 1];

  let carCondition = age > 1 ? CAR_CONDITIONS[1] : CAR_CONDITIONS[0];

  // Edge values and types check
  if (typeof color !== 'string' || typeof code !== 'number' || typeof age !== 'number') {
    console.log('Invalid input');
    return;
  }

  if (code < 1 || code > vehiclesList.length) {
    console.log(`Unknown vehicle type. Enter number from 1 to ${vehiclesList.length}`);
    return;
  }
  console.log(`a ${color} ${carCondition} ${VEHICLE_TYPE}`);
}

vehicleUpdated('green', 3, 1); // a green new bike

// 10. Use the list of vehicles to write an advertisement. So that it prints something like:
// "Amazing Joe's Garage, we service cars, motorbikes, caravans and bikes.".
function printAdvertisement(vehicles) {
  let adsText = "Amazing Joe's Garage, we service";

  for (vehicle of vehicles) {
    adsText += ` ${vehicle}s,`;
  }

  adsText = adsText.substring(0, adsText.length - 1) + '.';
  console.log(adsText);
}

printAdvertisement(vehiclesList);

// 11. Add one more vehicle to the list without changing the code for question 10
vehiclesList.push('cargo bike');
printAdvertisement(vehiclesList);

// 12. Create an empty object.
const newObj = {};

// 13. Create an object that contains the teachers that you have had so far for the different modules.
let teachers = {
  Tommy: '',
  Cris: '',
  Sahin: '',
};

// 14. Add a property to the object you just created that contains the languages that they have taught you.
teachers['Tommy'] = 'HTML, CSS';
teachers['Cris'] = 'Agile, Scrum';
teachers['Sahin'] = 'JavaScript';

console.log(teachers);

// 15. Write some code to test two arrays for equality using == and ===. Test the following:
// What do you think will happen with x == y, x === y and z == y and z == x? Prove it!
let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

function compareTwoVariables(val1, val2) {
  return val1 == val2;
}

function compareTwoVariablesStrict(val1, val2) {
  return val1 === val2;
}

// Strict and not strict equality returns same results with these arrays
console.log(compareTwoVariables(x, y)); // false
console.log(compareTwoVariables(x, z)); // false
console.log(compareTwoVariables(y, z)); // true

console.log(compareTwoVariablesStrict(x, y)); // false
console.log(compareTwoVariablesStrict(x, z)); // false
console.log(compareTwoVariablesStrict(y, z)); // true

console.log('-----');
// 16. Show that changing o2 changes o3 (or not) and changing o1 changes o3(or not).
// Does the order that you assign (o3 = o2 or o2 = o3) matter? Answer: YES
let o1 = { foo: 'bar' };
let o2 = { foo: 'bar' };

console.log(compareTwoVariablesStrict(o1, o2)); // false
let o3 = o2;

console.log(compareTwoVariablesStrict(o1, o2)); // false
console.log(compareTwoVariablesStrict(o3, o2)); // true - equal now
console.log(compareTwoVariablesStrict(o1, o3)); // false

o2 = { foo: 'lala' };
o1 = { foo: 'changed' }

console.log(compareTwoVariablesStrict(o1, o2)); // false
console.log(compareTwoVariablesStrict(o3, o2)); // false - not equal now, mutable
console.log(compareTwoVariablesStrict(o1, o3)); // false

// 17. What does the following code return? (And why?)
let bar = 42;

// typeof typeof bar returns string, because typeof itself always
// returns string with the name of value type. Decomposing it looks like:
// 1. typeof bar returns 'number'
// 2. typeof 'number' returns string.
console.log(typeof typeof bar);
