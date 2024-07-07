// src/components/Calculator.tsx
import React, { useState } from "react";
import "./Calc.css";

function Calculator() {
  const [Display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [SecondValue, setSecondValue] = useState(false);

  const inputDigit = (digit: string) => {
    if (SecondValue) {
      setDisplay(digit);
    } else {
      setDisplay(Display === "0" ? digit : Display + digit);
    }
  };

  const inputDot = () => {
    if (!Display.includes(".")) {
      setDisplay(Display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setOperator(null);
    setFirstValue(null);
    setSecondValue(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(Display);
    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(result);
    }

    setSecondValue(true);
    setOperator(nextOperator);
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    operator: string
  ): number => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };
  const handleEquals = () => {
    const inputValue = parseFloat(Display);

    if (firstValue !== null && operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setSecondValue(false);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{Display}</div>
      <div className="calculator-keys">
        <button onClick={clearDisplay} className="key-clear">
          AC
        </button>
        <button onClick={() => handleOperator("/")} className="key-operator">
          /
        </button>
        <button onClick={() => handleOperator("*")} className="key-operator">
          *
        </button>
        <button onClick={() => inputDigit("7")} className="key-digit">
          7
        </button>
        <button onClick={() => inputDigit("8")} className="key-digit">
          8
        </button>
        <button onClick={() => inputDigit("9")} className="key-digit">
          9
        </button>
        <button onClick={() => handleOperator("-")} className="key-operator">
          -
        </button>
        <button onClick={() => inputDigit("4")} className="key-digit">
          4
        </button>
        <button onClick={() => inputDigit("5")} className="key-digit">
          5
        </button>
        <button onClick={() => inputDigit("6")} className="key-digit">
          6
        </button>
        <button onClick={() => handleOperator("+")} className="key-operator">
          +
        </button>
        <button onClick={() => inputDigit("1")} className="key-digit">
          1
        </button>
        <button onClick={() => inputDigit("2")} className="key-digit">
          2
        </button>
        <button onClick={() => inputDigit("3")} className="key-digit">
          3
        </button>
        <button onClick={handleEquals} className="key-equals">
          =
        </button>
        <button onClick={() => inputDigit("0")} className="key-digit key-zero">
          0
        </button>
        <button onClick={inputDot} className="key-digit">
          
        </button>
      </div>
    </div>
  );
}

export default Calculator;
