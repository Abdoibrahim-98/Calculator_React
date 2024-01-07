import React, { useState } from "react";
import './main.css'

import history_white from "./history-white.png";
import history_black from "./history-black.png";

function Main() {
    const [isDark, setIsDark] = useState(false);
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
    };
    const setLightkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
    };

    const toggleTheme = (e) => {
        if(e.target.checked){
            setDarkMode();  
            setIsDark(true); 
        } 
        else{
            setLightkMode();
            setIsDark(false);
        } 
    };

    const[input, setInput] = useState('');
    const[result, setResult] = useState('');
    const[oldOperations, setOldOperations] = useState([]);
   
    const addToHistory = (expression) => {
        setOldOperations([
          ...oldOperations,
          expression,
        ]);
      
    };

    const showHideHistory = () =>{
            var element = document.getElementById('middle-section');
            
            // Check if the element has the 'highlight' class
            if (element.classList.contains('hide')) {
                // If it has the class, remove it
                element.classList.remove('hide');
            } else {
                // If it doesn't have the class, add it
                element.classList.add('hide');
            }
    }

    const onButtonPress = (value) =>{
        if(value === '='){
            if (/[\+\-\*\/]{2,}/.test(input + value)) {
                setResult('not allowed.');
                return;
            }
            try{
                if (isNaN(result) || !isFinite(result)) {
                    return "Error: Invalid expression.";
                }else{
                    setResult(eval(input));
                }
            }catch(error){
                setResult('error')
            }
            const text = `${input} = ${eval(input)}`;
            addToHistory(text);
        }else if(value === 'negative'){
            setResult(-1 * result);
        }else if(value === 'c'){
            setInput('');
            setResult('');
        }else{
            setInput(input + value);
        }
    }

    return(
        <div className="main">
            <div className="screen">
                <div className="upper-section">
                    <input type="checkbox" id="darkmode-toggle" onChange={toggleTheme}></input>
                    <label className="change-mode" for="darkmode-toggle">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sun">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 moon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    </label>
                    <button className="show-history" onClick={showHideHistory}><img src={isDark ? history_white : history_black} alt="History"></img></button>
                </div>
                <div className="middle-section hide" id="middle-section">
                    <ul className="history-operations">
                        {oldOperations.map((oldOperation, index) => (
                        <li key={index}>{oldOperation} <br />
                        ----------------------- <br />
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="lower-section">
                    <label>=</label>
                    <div className="operation">
                        {input}
                        
                    </div>
                    <div className="result">
                        {result}
                    </div> 
                </div>
            </div>
            <div className="keyboard">
                <div className="left-section">
                    <div className="left-upper">
                        <button className="btns left-upper-btns" onClick={()=> onButtonPress('c')} >AC</button>
                        <button className="btns left-upper-btns" onClick={()=> onButtonPress('negative')} >+/-</button>
                        <button className="btns left-upper-btns" onClick={()=> onButtonPress('%')} >%</button>
                    </div>
                    <div className="left-lower">
                        <button className="btns" onClick={()=> onButtonPress('1')}>1</button>
                        <button className="btns" onClick={()=> onButtonPress('2')}>2</button>
                        <button className="btns" onClick={()=> onButtonPress('3')}>3</button>
                        <button className="btns" onClick={()=> onButtonPress('4')}>4</button>
                        <button className="btns" onClick={()=> onButtonPress('5')}>5</button>
                        <button className="btns" onClick={()=> onButtonPress('6')}>6</button>
                        <button className="btns" onClick={()=> onButtonPress('7')}>7</button>
                        <button className="btns" onClick={()=> onButtonPress('8')}>8</button>
                        <button className="btns" onClick={()=> onButtonPress('9')}>9</button>
                        <button className="btns" onClick={()=> onButtonPress('.')}>.</button>
                        <button className="btns" onClick={()=> onButtonPress('0')}>0</button>
                        <button className="btns" onClick={()=> onButtonPress('00')}>00</button>
                    </div>
                </div>
                <div className="rigt-section">
                        <button className="btns right-btns" onClick={()=> onButtonPress('/')} >÷</button>
                        <button className="btns right-btns" onClick={()=> onButtonPress('*')} >x</button>
                        <button className="btns right-btns" onClick={()=> onButtonPress('-')} >-</button>
                        <button className="btns right-btns" onClick={()=> onButtonPress('+')} >+</button>
                        <button className="btns right-btns equal" onClick={()=> onButtonPress('=')} >=</button>
                </div>
            </div>

      </div>
    )
}
export default Main;