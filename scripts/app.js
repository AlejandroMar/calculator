class Model {
    constructor(){
        this.filteredArray = [];
        this.operators = ['+', '-', '*', '/', 'percent', '%' ];
        this.result = '';
        this.init();
        this.getFilteredArray;

    }

     init() {
        console.log('App runnning');
        
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
        this.reset = this.controlBtns.querySelector('#reset')
        this.decimalPoint = this.controlBtns.querySelector('[data-decimal]');
        this.numbersArray = Array.from(this.controlBtns.querySelectorAll('[data-number]'));
        this.operatorsArray = Array.from(this.controlBtns.querySelectorAll('[data-operator]'));
        //set input array
        this.userInputArray = [];
        //Controler functions
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
            this.prepArrayForMath();
            modelInstance.doMath(modelInstance.filteredArray);
            viewInstance.showResult(modelInstance.result);
        });
        //Undo btn listener
        this.undoBtn.addEventListener('click', (e) => {
            this.undo();
            viewInstance.displayInput(modelInstance.filteredArray);
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
        let lastItem = modelInstance.filteredArray[modelInstance.filteredArray.length - 1];
        if(modelInstance.operators.includes(lastItem)){
            console.log('invalid equation');
        }
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
        let stringForDisplay = arr.join('')
        this.displayLayer.innerHTML = `<h3>${stringForDisplay}</h3>`
    }

    showResult(str){
        this.displayLayer.innerHTML = `<h3>${str}</h3>`
    }
     
}

const modelInstance = new Model();
const controlerInstance = new Controler();
const viewInstance = new View();


/* let controlers = document.getElementById('controlers');
console.log(controlers);
 */

