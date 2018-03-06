let testArr = ["7", "8";];
let number = [];
let testArrLength = testArr.length
for(let i=testArrLength - 1; i>=0; i--){
  console.log(testArr[i]);
    if(testArr[i] === '-'){
        break;
    }
    number.unshift(testArr.pop());
    
    console.log(testArr);
    
}

number.push('/', '100');
numberJoined = number.join('');
numberInpercent = eval(numberJoined);
console.log(number);
console.log(numberJoined);
numberInpercent
testArr.push(numberInpercent);
testArr

