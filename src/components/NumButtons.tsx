import React, { useState } from 'react'
interface NumButtonsProps{
  display: {
    mainNum: string;
    calc: {
      display:string;
      data: string[];
    }
  };
  setDisplay: (data: object) => void;
}
const NumButtons = ({display,setDisplay}:NumButtonsProps) => {
  //Buncha functions here
  //Too lazy to type 0-9, so I just for looped it.
  const btnData= ["0","."];
  for(let i=1;i<=9;i++){
    btnData.push(`${i}`);
  }
  //The actual data and states
  console.log(display);
  const handleBtnClick = (btnInputData: string) =>{
    const setDisplayData = display.calc.data;
    let setDisplayText = display.calc.display;
    
    if(
      ( !btnInputData.includes(".") ) ||
      ( btnInputData.includes(".") && !setDisplayData[setDisplayData.length-1].includes(".") )
    ){
      //Period
      setDisplayText = setDisplayText + btnInputData;
      setDisplayData[setDisplayData.length-1] = setDisplayData[setDisplayData.length-1] + btnInputData;
    }
    setDisplay({
      mainNum: "",
      calc: {
        display: setDisplayText,
        data: setDisplayData
      }
    })
  }
  return (
    <>
      <div className='btn-num collection'>
        {
          btnData.map((btnText)=>{
            let id="";
            if(btnText==="."){
              id="dot"
            }
            else{
              id=btnText
            }
            return(
              <a href="#" className={`btn btn-${btnText}`}  key={id} onClick={()=>{
                handleBtnClick(btnText);
              }}>
                {btnText}
              </a>
            )
          })
        }
      </div>
    </>
  )
}

export default NumButtons