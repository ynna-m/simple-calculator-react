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
    const setDisplayData = display.calc.data;
    let setDisplayText = display.calc.display;
    if(ops==="+" && (!display.calc.display[display.calc.display.length-1].includes("+"))){
      setDisplayData.push(ops);
      setDisplayData.push("");
      setDisplayText = setDisplayText + "+";
      setDisplay({
          mainNum:display.mainNum,
          calc:{
            display: setDisplayText,
            data: setDisplayData
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