import React, { useState } from 'react'
interface OperatorButtonsProps{
  display: {
    mainNum: string;
    calc: {
      display:string;                                       
      data: number;
    }
  };
  numInputChange: (data: object) => void;
}

const OperatorButtons = ({display,setDisplay}:NumButtonsProp) => {
  const handleCalculate = (arrayData:[],ops:string): string[] =>{
    if(ops==="x"){
      let output: string[] = handleCalculate(arrayData,"");
      output = output.reduce( ( 
          accumulator : string[], 
          curVal : string, 
          index : number, 
          array : string []
        )=>{
          
        if( ( index > 0 &&  index+1 < array.length ) && curVal === "x"){
          const calculation : string = ( Number( array[index-1] ) * Number( array[index+1] ) ).toString();
          
          accumulator.push(calculation);
        }
        else{
          accumulator.push(curVal)
        }
        console.log("redu",index,accumulator);
        return accumulator;
      },[]);
      console.log("multiply", output)
      return output;
    }
    else if(ops==="/"){
      let output: string[] = handleCalculate(arrayData,"x");
      return output;
    }
    else if(ops==="+"){
      let output: string[] = handleCalculate(arrayData,"/");
      return output;
    }
    else if(ops==="-"){
      let output: string[] = handleCalculate(arrayData,"+");
      return output;
    }
    else {
      let output: string[] =  [...arrayData]
      return output;
    }
    
  }

  const handleBtnClick = (ops:string) =>{
    const displayData = display.calc.data;
    let setDisplayText = display.calc.display;
    const regExOps = /(\+|\-|\/|x)$/;
    const regExInt = /\d/;
    if(ops==="=" && ( 
        displayData.length > 2
      ) ){
        
        const data = handleCalculate(displayData,"-");
        console.log("equals", data);
    }
    // ops.match(/^(\+|\-|\/|x)$/)
    else if( ops.match( regExOps ) && 
      (
        display.calc.display.length === 0 ||
        !display.calc.display[ display.calc.display.length - 1 ].match( regExOps )
      )   ){
        console.log(displayData.length,displayData[displayData.length-1].length,ops);
        if(displayData.length===1 && displayData[displayData.length-1].length===0 && ops === "-"){
          // minus is a special case. It should be treated as a negative number instead if it is in the beginning.
          console.log("true");
          displayData[displayData.length-1] += ops;
          setDisplayText += ops;
        }
        else if(displayData.length > 0 && displayData[displayData.length-1].match(regExInt)){
          displayData.push(ops);
          displayData.push("");
          setDisplayText += ops;
        }
      
      setDisplay({
        mainNum:display.mainNum,
        calc:{        
          display: setDisplayText,
          data: displayData
        }
      })
    }
  }

  return (
    <>
      <div className="btn-ops collection">
        <a href="#" className="btn btnOpsPlus" onClick={()=>handleBtnClick("+")}>
          +
        </a>
        <a href="#" className="btn btnOpsMinus" onClick={()=>handleBtnClick("-")}>
          -
        </a>
        <a href="#" className="btn btnOpsMultiply" onClick={()=>handleBtnClick("x")}>
          x
        </a>
        <a href="#" className="btn btnOpsDivide" onClick={()=>handleBtnClick("/")}>
          ÷
        </a>
        <a href="#" className="btn btnOpsDivide" onClick={()=>handleBtnClick("=")}>
          =
        </a>
        <a href="#" className="btn btnOpsErase" onClick={()=>handleBtnClick("erase")}>
          ⌫
        </a>
        <a href="#" className="btn btnOpsEraseAll" onClick={()=>handleBtnClick("reset")}>
          AC
        </a>
      </div>
    </>
  )
}

export default OperatorButtons