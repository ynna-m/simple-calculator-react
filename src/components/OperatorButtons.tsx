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
  const handleBtnClick = (ops:string) =>{
    const displayData = display.calc.data;
    let setDisplayText = display.calc.display;
    if(ops==="=" && ( !display.calc.display[display.calc.display.length-1 ].includes( "+" ) ) ){
      let output = 0;
      let arrayOfCalculation = [];
      // I think you're supposed to use recursion with this
      let multiplicationIndices = displayData.reduce((out,element,index)=>{
        if(element === "x"){
          out.push(index);
        }
      },[]);
      
    }
    else if( ops==="+" && ( !display.calc.display[display.calc.display.length-1 ].includes( "+" ) ) ){
      displayData.push(ops);
      displayData.push("");
      setDisplayText = setDisplayText + "+";
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