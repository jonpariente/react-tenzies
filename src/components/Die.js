import React from "react"

const Die = (props) => {
    return (
        <div className={props.isHeld ? "die--face active" : "die--face"} onClick={props.holdDice}>
            <span className="die--num">{props.value}</span>
        </div>
    )
}

export default Die;