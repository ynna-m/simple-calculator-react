import React from 'react'
interface DisplayProps {
  display: {
    mainNum: string;
    calc: {
      display:string;
      data: number;
    }
  };
}
const Display = ({display} : DisplayProps) => {
  return (
    <>
      <div className="main-display">
        <div className="display display-main">{display.mainNum}</div>
        <div className="display display-calc">{display.calc.display}</div>
      </div>
    </>
  )
}

export default Display