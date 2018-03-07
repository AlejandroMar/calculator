class Model {
    constructor(){
        this.filteredArray = [];
        this.operators = ['+', '-', '*', '/', '%' ];
        this.result = '';
        this.cleanFilteredArray;
        this.mathDone = false;  
    }

   

    //funtion to configurate the percentage in the filtered array
     setPercentInFilteredArr(){
        
         //still don't know if I should reference the array I like it it's more clear
        let tempArr = this.filteredArray;
        tempArr.push('/100');
        console.log(tempArr);
        console.log(this.filteredArray);
          
     }

    //function for cleaning the array
    cleanFilteredArray(){
        this.filteredArray = [];
    }

    cleanResul(){
        this.result = '';
    }
    
    resultIntoFilteredArray(){
        this.filteredArray.push(this.result);
        this.mathDone = false;
    }

    // function in charge of resolving the equation
    doMath(arr){
        
        let arrayToString = arr.join('');
        console.log(arrayToString);
        this.result = String(eval(arrayToString));
        console.log(this.result);
        this.mathDone = true;
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
        this.percentBtn = this.controlBtns.querySelector('[data-percent]');
        this.numbersArray = Array.from(this.controlBtns.querySelectorAll('[data-number]'));
        this.operatorsArray = Array.from(this.controlBtns.querySelectorAll('[data-operator]'));
        
        
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
                //check if matDone to if tru strart again
                
                let clickedNumber = e.target.dataset.number;
                this.checkForNumber(clickedNumber);
                viewInstance.displayInput(modelInstance.filteredArray);
            })
        });

        //listen for operator events
        this.operatorsArray.forEach((operator)=> {
            //check if  mathDone if true continue
            operator.addEventListener('click', (e)=>{
                if(modelInstance.mathDone){
                    modelInstance.resultIntoFilteredArray();   
                }
                
            })
            operator.addEventListener('click', (e) =>{
                let clickedOperator = e.target.dataset;
                this.checkOperators(clickedOperator);
                viewInstance.displayInput(modelInstance.filteredArray);
            })
            
        });
        //listen for Equal button and habndle the event
        this.equalBtn.addEventListener('click', (e)=>{
             if(modelInstance.mathDone){
                modelInstance.resultIntoFilteredArray();
                //viewInstance.showResult(modelInstance.result);
            } 
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

        this.percentBtn.addEventListener('click', () =>{ 
            debugger;
            if(modelInstance.mathDone){
                modelInstance.resultIntoFilteredArray();   
            }
            if(modelInstance.filteredArray.length === 0){
                viewInstance.alertInvalidOperation();
                
            }else{
                modelInstance.setPercentInFilteredArr();
                viewInstance.displayInput(modelInstance.filteredArray);
            }
        })

    } 

    // functions for checking diferent inputs
   

    //checks if input is a number and if true push to array
    checkForNumber(data){
        let lastItem = modelInstance.filteredArray[modelInstance.filteredArray.length - 1];
        if(modelInstance.mathDone){
            modelInstance.cleanFilteredArray();
            modelInstance.mathDone = false;
        }
        if(lastItem === '/100'){
            modelInstance.filteredArray.push('*');
        }
        
        modelInstance.filteredArray.push(data);
        console.log(modelInstance.filteredArray);
        
    }
   
    //Checks for valid operations
    checkOperators(data){
        
        //define last and second las item in array
        let lastItem = modelInstance.filteredArray[modelInstance.filteredArray.length - 1];
        let secondLast = modelInstance.filteredArray[modelInstance.filteredArray.length - 2];
        console.log(lastItem);
        // Check if last item is and operator
        if(modelInstance.operators.includes(lastItem)){
            //Check if second last is not an operator
            if((data.operator === '-' && !modelInstance.operators.includes(secondLast)) && lastItem !== '-'){
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
                elem = 'rest';
            }
            if(elem === '/100'){
                elem =  '%';
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

