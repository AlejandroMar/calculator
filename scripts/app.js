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

    getFilteredArray(arr){
        this.filteredArray = arr;
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
        this.controlBtns.forEach((btn) => {
            btn.addEventListener('click',(e)=>{ 
                controlerInstance.getClickedDataSet(e);
                viewInstance.displayInput(this.userInputArray);
            })
        });

        //listen for Equal button and habndle the event
        this.equalBtn.addEventListener('click', (e)=>{
            this.prepArrayForMath();
            modelInstance.getFilteredArray(this.userInputArray);
            modelInstance.doMath(modelInstance.filteredArray);
            viewInstance.showResult(modelInstance.result);
        })
    }


    getClickedDataSet(e){
        let clickedDataset = e.target.dataset;
        controlerInstance.filterInput(clickedDataset);
    }

    //make shure the input is valid
    filterInput(data){
        //input numbers
        if(data.number){
            this.checkForNumber(data);
        //check for valid operators   
        }else if(data.operator){
            this.checkOperators(data);
        }//Check for equal button and call Model.doMath
         else if(data.undo){
            this.undo(this.userInputArray)
        }
        
    }

    // functions for checking diferent inputs

    //checks if input is a number and if true push to array
    checkForNumber(data){
        this.userInputArray.push(data.number);
        console.log(this.userInputArray);
    }
   
    //Checks for valid operations
    checkOperators(data){
        //debugger;
        //define last and second las item in array
        let lastItem = this.userInputArray[this.userInputArray.length - 1];
        let secondLast = this.userInputArray[this.userInputArray.length - 2];
        console.log(lastItem);
        // Check if last item is and operator
        if(modelInstance.operators.includes(lastItem)){
            //Check if second last is not an operator
            if(data.operator === '-' && !modelInstance.operators.includes(secondLast)){
                this.userInputArray.push(data.operator);
                console.log(this.userInputArray);  
            }else{
                console.log('Invalid input');  
            }        
        }else{
                this.userInputArray.push(data.operator);
                console.log(this.userInputArray); 
            }
    }
    
    //This function makes shure the array is ready for the math function
    prepArrayForMath(){
        //debugger;
        let lastItem = this.userInputArray[this.userInputArray.length - 1];
        if(modelInstance.operators.includes(lastItem)){
            console.log('invalid equation');
        }
    }
    //undo last input
    undo(){
        let poppedValue = this.userInputArray.pop();
        console.log(this.userInputArray);
        
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

