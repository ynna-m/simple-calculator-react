interface DisplayProps {
    display: {
        mainNumber: string;
        calculationString: string;
    }
}
const Display = ({display} : DisplayProps) =>{
    return(
        <div className="calc-display container">
            <div className="calc-display calc-display-calculation-string">
                {display.calculationString}
            </div>
            <div className="calc-display calc-display-main-number">
                {display.mainNumber}
            </div>
        </div>
    )
}

export default Display