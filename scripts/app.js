class Model {
    constructor(){
        this.filteredArray = [];
        this.operators = ['+', '-', '*', '/', 'percent', '%' ];
        this.result = '';
        this.cleanFilteredArray;
    }

 

    //function for cleaning the array
    cleanFilteredArray(){
        this.filteredArray = [];
    }

    cleanResul(){
        this.result = '';
    }

    // function in charge of resolving the equation
    doMath(arr){
        //debugger;    
        let arrayToString = arr.join('');
        console.log(arrayToString);
        this.result = eval(arrayToString);
        console.log(this.result);
    } 
};

//Controler Class
class Controler {
    constructor(){
        //get the  buttons container
        this.controlBtns = document.getElementById('controlBtns');
        this.equalBtn = this.controlBtns.querySelector('#equal'); 
        this.undoBtn = this.controlBtns.querySelector('#undo');
        this.resetBtn = this.controlBtns.querySelector('#reset')
        this.decimalPoint = this.controlBtns.querySelector('[data-decimal]'); // not used now
        this.numbersArray = Array.from(this.controlBtns.querySelectorAll('[data-number]'));
        this.operatorsArray = Array.from(this.controlBtns.querySelectorAll('[data-operator]'));
        //set input array

        //Controler functions initiation
        this.setEventListeners();
        this.checkForNumber;
        this.checkOperators;
        this.prepArrayForMath;
        this.undo;
    }

    //listen for events
    setEventListeners(){
        //listen for number Events
        this.numbersArray.forEach((number)=> {
            number.addEventListener('click', (e) =>{
                let clickedNumber = e.target.dataset.number;
                this.checkForNumber(clickedNumber);
                viewInstance.displayInput(modelInstance.filteredArray);
            })
        });

        //listen for operator events
        this.operatorsArray.forEach((operator)=> {
            operator.addEventListener('click', (e) =>{
                let clickedOperator = e.target.dataset;
                this.checkOperators(clickedOperator);
                viewInstance.displayInput(modelInstance.filteredArray);
            })
        });
        //listen for Equal button and habndle the event
        this.equalBtn.addEventListener('click', (e)=>{
            if(this.prepArrayForMath()){
            modelInstance.doMath(modelInstance.filteredArray);
            viewInstance.showResult(modelInstance.result);
            modelInstance.cleanFilteredArray();
            }else{
                viewInstance.alertInvalidOperation()
                console.log('Invalid operation')
            }
        });
        //Undo btn listener
        this.undoBtn.addEventListener('click', (e) => {
            this.undo();
            viewInstance.displayInput(modelInstance.filteredArray);
        })
        //reset button listener
        this.resetBtn.addEventListener('click', (e) =>{
            //clean array
            modelInstance.cleanFilteredArray();
            //clean result
            modelInstance.cleanResul();
            //show cleaned array
            viewInstance.showResult(modelInstance.result);  
        })


    } 

    // functions for checking diferent inputs

    //checks if input is a number and if true push to array
    checkForNumber(data){
        modelInstance.filteredArray.push(data);
        console.log(modelInstance.filteredArray);
    }
   
    //Checks for valid operations
    checkOperators(data){
        //debugger;
        //define last and second las item in array
        let lastItem = modelInstance.filteredArray[modelInstance.filteredArray.length - 1];
        let secondLast = modelInstance.filteredArray[modelInstance.filteredArray.length - 2];
        console.log(lastItem);
        // Check if last item is and operator
        if(modelInstance.operators.includes(lastItem)){
            //Check if second last is not an operator
            if(data.operator === '-' && !modelInstance.operators.includes(secondLast)){
                modelInstance.filteredArray.push(data.operator);
                console.log(modelInstance.filteredArray);  
            }else{
                console.log('Invalid input');  
            }        
        }else{
            modelInstance.filteredArray.push(data.operator);
                console.log(modelInstance.filteredArray); 
            }
    }
    
    //This function makes shure the array is ready for the math function
    prepArrayForMath(){
        debugger;
        let lastItemTestPassed = false;
        let lastItem = modelInstance.filteredArray[modelInstance.filteredArray.length - 1];
        let seconItem = modelInstance.filteredArray[1];
        let firstItem = modelInstance.filteredArray[0];
        if(modelInstance.operators.includes(lastItem)){
            lastItemTestPassed = false;
        }
        else{
            lastItemTestPassed = true;
        }
        //check if first item in array is 0
        if(firstItem === '0' && seconItem !== '.'){
            //for octal literals use the "0o" prefix instead
            modelInstance.filteredArray[0] = '0o';
        }
        //check if  test are passed
        return lastItemTestPassed
        
    }
    //undo last input
    undo(){
        let poppedValue = modelInstance.filteredArray.pop();
        console.log(modelInstance.filteredArray);
        
    }    
}

class View {
    constructor(){
        this.displayLayer = document.getElementById('display-numbers');
        this.showResult;
        this.displayInput;
    }

    displayInput(arr){
        let stringForDisplay = arr.map((elem) => {
            if(elem === '%'){
                elem = 'rest'
            }
            return elem
        }).join('');
        
        
        console.log(stringForDisplay);
        
        this.displayLayer.innerHTML = `<h3 class="userInput">${stringForDisplay}</h3>`
    }

    showResult(str){
        this.displayLayer.innerHTML = `<h3 class="answer">${str}</h3>`
    }

    alertInvalidOperation(){
        let invalidOperationMssg = `<p class="invalid-alert red lighten-1">Invalid operation please press undo</p>` 
        this.displayLayer.insertAdjacentHTML('beforeend', invalidOperationMssg )
    }
     
}

const modelInstance = new Model();
const controlerInstance = new Controler();
const viewInstance = new View();


/* let controlers = document.getElementById('controlers');
console.log(controlers);
 */

