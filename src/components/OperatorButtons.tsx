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
  const handleCalculate = (arrayData:[],ops:string)=>{
    if(!ops){
      let output =  [...arrayData]
      return output;
    }
    else if(ops==="-"){
      let calculation = handleCalculate(arrayData,"");
      return calculation;
    }
    else if(ops==="+"){
      let calculation = handleCalculate(arrayData,"");
      return calculation;
    }
    else if(ops==="/"){
      let calculation = handleCalculate(arrayData,"+");
      return calculation;
    }
    else if(ops==="x"){
      let calculation = handleCalculate(arrayData,"/");
      return calculation;
    }
  }

  const handleBtnClick = (ops:string) =>{
    const displayData = display.calc.data;
    let setDisplayText = display.calc.display;
    const regExOps = /(\+|\-|\/|x)$/;
    if(ops==="=" && ( !display.calc.display[display.calc.display.length-1 ] === "="  ) ){

    }
    // ops.match(/^(\+|\-|\/|x)$/)
    else if( ops.match( regExOps ) && 
            ( 
              display.calc.display.length-1 < 0 && 
              !display.calc.display[display.calc.display.length-1 ].match( regExOps ) 
            ) 
          ){
      displayData.push(ops);
      // minus is a special case. It should be treated as a negative number instead
      if(ops !== "-"){
        displayData.push("");
      }
      setDisplayText = setDisplayText + ops;
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
        <a href="#" className="btn btnOpsMultiply" onClick={()=>handleBtnClick("*")}>
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