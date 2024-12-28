import { Dispatch, SetStateAction } from "react";

interface CalculatorButtonsProps{
    display: {
        mainNumber: string;
        calculationString: string;
    };
    setDisplay: Dispatch<SetStateAction<{
        mainNumber:string; 
        calculationString:string
    }>>;
}
const CalculatorButtons = ({display,setDisplay}:CalculatorButtonsProps) => {
    const numberButtons : string[] = ["7","8","9","4","5","6","1","2","3","0"];

    const handleNumberClick = (buttonInputData:string) =>{
        let calculationString:string = display.calculationString;
        
        if(calculationString==="0" && parseFloat(buttonInputData) >= 0){
            calculationString = buttonInputData
        }
        else if (calculationString==="0" && buttonInputData.includes(".")){
            calculationString += "."
        }
        else {
            if(buttonInputData.includes(".") && !calculationString.includes(".")){
                calculationString += "."
            }
            else if(!buttonInputData.includes(".")){
                calculationString += buttonInputData   
            }
        }
        setDisplay({
            mainNumber: display.mainNumber,
            calculationString: calculationString
        })
    }

    const handleOperatorClick = (buttonInputData:string)=>{
        let curNumber:string = display.mainNumber;
        let curCalculationString:string = display.calculationString;
        const checkRegEx:RegExp = /[^+\-x÷]/g;
        switch (buttonInputData){
            case "clear":{
                curNumber = "0";
                curCalculationString = "";
                break;
            }
            case "erase":{
                if(curCalculationString.length===1){
                    curCalculationString = "0"
                }
                else{
                    curCalculationString = curCalculationString.substring(0, curCalculationString.length-1);
                }
                break;
            }
            case "open-para":{
                curCalculationString += "("
                break         
            }
            case "close-para":{
                let countOpenParenthesis:number = 0;
                let countCloseParenthesis:number = 0;
                for(let i:number = 0; i < curCalculationString.length ; i++){
                    if(curCalculationString[i]=="("){
                        countOpenParenthesis++;
                    }
                    if(curCalculationString[i]==")"){
                        countCloseParenthesis++;
                    }
                }
                if(
                    countCloseParenthesis < countOpenParenthesis &&
                    curCalculationString[curCalculationString.length-1].match(checkRegEx)
                ){
                    curCalculationString += ")"
                }

                break
            }
            case "divide":{
                if(curCalculationString[curCalculationString.length-1].match(checkRegEx)){
                    curCalculationString += "÷"
                }
                else{
                    curCalculationString = curCalculationString.substring(0, curCalculationString.length-1)+"÷"
                }
                break
            }
            case "multiply":{
                if(curCalculationString[curCalculationString.length-1].match(checkRegEx)){
                    curCalculationString += "x"
                }
                else{
                    curCalculationString = curCalculationString.substring(0, curCalculationString.length-1)+"x"
                }
                break
            }
            case "subtract":{
                if(curCalculationString[curCalculationString.length-1].match(checkRegEx)){
                    curCalculationString += "-"
                }
                else{
                    curCalculationString = curCalculationString.substring(0, curCalculationString.length-1)+"-"
                }
                break
            }
            case "add":{
                if(curCalculationString[curCalculationString.length-1].match(checkRegEx)){
                    curCalculationString += "+"
                }
                else{
                    curCalculationString = curCalculationString.substring(0, curCalculationString.length-1)+"+"
                }
                break
            }
            case "equals":{
                curNumber = evaluateExpression(curCalculationString);
                if(!curNumber){
                    curNumber = "0";
                    curCalculationString = "";
                }
                else{
                    curCalculationString = curNumber;
                }                
                break
            }
        }
        // if(buttonInputData.includes("clear")){
        //     curNumber = "0";
        //     curCalculationString = "";
        // }
        // else if(buttonInputData.includes("erase")){
        //     curNumber = curNumber.substring(0, curNumber.length-1);
        // }
        console.log('handleOperatorClick currentCalculationString: ',curCalculationString);
        setDisplay({
            mainNumber: curNumber,
            calculationString: curCalculationString
        })
    }
    const evaluateExpression = (expression:string):string =>{
        if(!expression){
            return "";
        }        
        expression = expression.replace(/(\d)(\()/g, `$1x(`);
        const precedence = (op:string):number => {
            if (op === '+' || op === '-') return 1;
            if (op === 'x' || op === '÷') return 2;
            return 0;
        }
        const applyOp = (a:number | undefined, b:number | undefined, op:string | undefined):number=>{
            if(a === undefined || b === undefined || op === undefined){
                return 0
            }
            switch (op) {
                case '+': return a + b;
                case '-': return a - b;
                case 'x': return a * b;
                case '÷': return a / b;
            }
            return 0;
        }
        let finalNumberString:string | undefined = '';
        const values:number[] = [];
        const operators:string[] = [];

        for(let i:number = 0; i < expression.length ; i++){
            const char:string = expression[i];

            if (/\d/.test(char)) {
                // Parse multi-digit numbers
                let value:string = '';
                while (i < expression.length && (/\d/.test(expression[i]) || expression[i] === '.')) {
                    value += expression[i];
                    i++;
                }
                values.push(parseFloat(value));
                i--; // Adjust index
            } else if (char === '(') {
                operators.push(char);
            } else if (char === ')') {
                // Evaluate the expression inside parentheses
                while (operators.length && operators[operators.length - 1] !== '(') {
                    const b = values.pop();
                    const a = values.pop();
                    const op = operators.pop();
                    values.push(applyOp(a, b, op));
                }
                operators.pop(); // Remove '('
            } else if ('+-x÷'.includes(char)) {
                // Handle operators
                while (
                    operators.length &&
                    precedence(operators[operators.length - 1]) >= precedence(char)
                ) {
                    const b = values.pop();
                    const a = values.pop();
                    const op = operators.pop();
                    values.push(applyOp(a, b, op));
                }
                operators.push(char);
            }
        }
        while (operators.length) {
            const b = values.pop()!;
            const a = values.pop()!;
            const op = operators.pop()!;
            values.push(applyOp(a, b, op));
        }
        finalNumberString = values.pop()?.toString();
        if(finalNumberString === undefined){
            finalNumberString = "undefined";
        }
        return finalNumberString;
    }
    return (
        <>
            <div className="calc-buttons container">
                <div className="calc-buttons calc-buttons-numbers">
                <>
                    {
                        numberButtons.map((btnText) =>{
                            return(
                                <a 
                                    href="#"
                                    className={`calc-buttons-number button-number-${btnText}`}
                                    key={btnText}
                                    onClick={()=>{handleNumberClick(btnText)}}
                                >
                                    {btnText}
                                </a>
                            )
                        })
                    }
                        <a href="#" className="calc-buttons-number button-number-decimal" onClick={()=>{handleNumberClick(".")}}>
                            .
                        </a>
                        
                </>
                </div>
                <div className="calc-buttons calc-buttons-operators">
                    <a href="#" className="calc-buttons-clear" onClick={()=>{handleOperatorClick("open-para")}}>
                        (
                    </a>
                    <a href="#" className="calc-buttons-clear" onClick={()=>{handleOperatorClick("close-para")}}>
                        )
                    </a>
                    <a href="#" className="calc-buttons-clear" onClick={()=>{handleOperatorClick("clear")}}>
                        CLEAR
                    </a>
                    <a href="#" className="calc-buttons-erase" onClick={()=>{handleOperatorClick("erase")}}>
                        ⌫
                    </a>
                    <a href="#" className="calc-buttons-divide" onClick={()=>{handleOperatorClick("divide")}}>
                        ÷
                    </a>
                    <a href="#" className="calc-buttons-multiply" onClick={()=>{handleOperatorClick("multiply")}}>
                        x
                    </a>
                    <a href="#" className="calc-buttons-subtract" onClick={()=>{handleOperatorClick("subtract")}}>
                        -
                    </a>
                    <a href="#" className="calc-buttons-add" onClick={()=>{handleOperatorClick("add")}}>
                        +
                    </a>
                    <a href="#" className="calc-buttons-equals" onClick={()=>{handleOperatorClick("equals")}}>
                        =
                    </a>
                </div>
            </div>
        </>        
    )
}

export default CalculatorButtons