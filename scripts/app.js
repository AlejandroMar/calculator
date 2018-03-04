class Model {
    constructor(){
        //get the buttons container
        this.controlBtns = document.getElementById('controlBtns');
        //this.equalBtn = this.controlBtns.querySelector('[data-equal]');
        this.filteredInputArray = [];
        this.operators = ['+', '-', '*', '/'];
        
        this.init();
    }

     init() {
        console.log('App runnning');
        
    }
    // function in charge of resolving the equation
    doMath(arr){
        debugger;   
        this.filteredInputArray = controlerInstance.userInputArray; 
        let arrayToString = this.filteredInputArray.join('');
        console.log(arrayToString);
        let result = eval(arrayToString);
        console.log(result);
    } 
};

//Controler Class
class Controler {
    constructor(){
        this.userInputArray = [];
        this.setEventListeners();
        this.checkForNumber;
        this.checkOperators;
        this.prepArrayForMath;
        this.undo;
    }

    //listen for events
    setEventListeners(){
        modelInstance.controlBtns.addEventListener('click',(e)=>{
            controlerInstance.getClickedDataSet(e);
            viewInstance.displayInput();
        });    
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
         else if(data.equal){
            this.prepArrayForMath(data);
        }else if(data.undo){
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
    prepArrayForMath(data){
        debugger;
        let lastItem = this.userInputArray[this.userInputArray.length - 1];
        if(modelInstance.operators.includes(lastItem)){
            console.log('invalid equation');
        }else{
            modelInstance.doMath(this.userInputArray);
            this.userInputArray = [];
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
        this.display = document.querySelector('.display-numbers')
        console.log(this.display);  
    }

    displayInput(){
        this.display.innerHTML = `<span>${controlerInstance.userInputArray}</span>`
    }
}

const modelInstance = new Model();
const controlerInstance = new Controler();
const viewInstance = new View();


/* let controlers = document.getElementById('controlers');
console.log(controlers);
 */

