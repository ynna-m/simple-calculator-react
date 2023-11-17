import React, { useState } from 'react'
import Display from './Display'
import NumButtons from './NumButtons'
import OperatorButtons from './OperatorButtons'

const Container = () => {
  const [display, setDisplay] = useState({
    mainNum: "",
    calc: {
      display: "",
      data: [""]
    }
  });
  return (
    <>
      <div className="container">
        <Display display={display} />
        <div className='button-collection'>
          <NumButtons 
            display={display} 
            setDisplay={display => setDisplay(display)}
          />
          <OperatorButtons
            display={display} 
            setDisplay={display => setDisplay(display)}
          />
        </div>
      </div>
    </>
  )
}

export default Container