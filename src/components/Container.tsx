import CalculatorButtons from "./CalculatorButtons"
import Display from "./Display"

import { useState } from "react"
const Container = () => {
    const [display, setDisplay] = useState({
        mainNumber: "0",
        calculationString: ""
    })
    return(
        <div className="container calc-container">
            <h1 className="header-h1">
                Simple Calculator
            </h1>
            <Display display={display} />
            <CalculatorButtons 
                display={display}
                setDisplay={setDisplay}
            />
        </div>
    )
}
export default Container