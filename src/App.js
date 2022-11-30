import React, {useEffect, useState} from 'react';
import Die from './components/Die';
import Confetti from 'react-confetti';

const App = () => {    
    const allNewDice = () => {
        const newDice = [];
        
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie(i));
        }

        return newDice;
    }

    const generateNewDie = (i) => {
        return {id: i, value: Math.floor(Math.random() * 6) + 1, isHeld: false}
    }
    
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    console.log(dice)

    const rollDice = () => {
        if (!tenzies) {
            setDice(oldDice => oldDice.map((die, index) => {
                return die.isHeld ? die : generateNewDie(index)
            }));
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    const holdDice = (id) => {
        setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
    }

    useEffect(() => {
        const {value} = dice.find(die => die.isHeld === true) || dice[0].value;
        const result1 = dice.every(die => die.isHeld)
        const result2 = dice.every(die => die.value === value);
        
        if (result1 && result2) {
            setTenzies(true)
            console.log('You won!')
        }
    }, [dice])

    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <main>
            {tenzies && <Confetti width={width} height={height} />}
            <div className="container">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {dice.map(die => <Die id={die.id} key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)}
                </div>
                <button className="btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </main>
    );
}

export default App;