import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import correction from "../img/correction.png";

function Calculator() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [total, setTotal] = useState(null);
  const [operator, setOperator] = useState(null);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }

    let cal;
    switch (operator) {
      case "÷":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "×":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "–":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      case "𝑥²":
        cal = String(parseFloat(preState) * parseFloat(preState));
        break;
      case "¹/𝑥":
        cal = String(1 / parseFloat(preState));
        break;
      case "²√𝑥":
        cal = String(Math.sqrt(parseFloat(preState)));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const backspace = () => {
    setCurState(curState.slice(0, curState.length - 1));
    if (curState.length === 0) {
      setCurState("");
      setCurState("");
      setInput("0");
    }
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };

  return (
    <div className="container">
      <div className="calculator-box">
        <div className="window-closing">
          <div className="buttons">
            <span>-</span>
            <span>□</span>
            <span className="x">×</span>
          </div>
        </div>
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>

        <div className="keypad">
          <button className="calculator-spe" onClick={percent}>
            %
          </button>
          <button className="calculator-spe" onClick={reset}>
            CE
          </button>
          <button className="calculator-spe" onClick={reset}>
            C
          </button>
          <button className="calculator" onClick={backspace}>
            <img className="correction" src={correction} alt="correction" />
          </button>
          <button className="calculator-spe" onClick={operatorType}>
            ¹/𝑥
          </button>
          <button className="calculator-spe" onClick={operatorType}>
            𝑥²
          </button>
          <button className="calculator-spe" onClick={operatorType}>
            ²√𝑥
          </button>
          <button className="calculator" onClick={operatorType}>
            ÷
          </button>
          <button className="numberPad" onClick={inputNum}>
            7
          </button>
          <button className="numberPad" onClick={inputNum}>
            8
          </button>
          <button className="numberPad" onClick={inputNum}>
            9
          </button>
          <button className="calculator" onClick={operatorType}>
            ×
          </button>
          <button className="numberPad" onClick={inputNum}>
            4
          </button>
          <button className="numberPad" onClick={inputNum}>
            5
          </button>
          <button className="numberPad" onClick={inputNum}>
            6
          </button>
          <button className="calculator" onClick={operatorType}>
            –
          </button>
          <button className="numberPad" onClick={inputNum}>
            1
          </button>
          <button className="numberPad" onClick={inputNum}>
            2
          </button>
          <button className="numberPad" onClick={inputNum}>
            3
          </button>
          <button className="calculator" onClick={operatorType}>
            +
          </button>
          <button className="numberPad" onClick={minusPlus}>
            +/–
          </button>
          <button className="numberPad" onClick={inputNum}>
            0
          </button>
          <button className="numberPad" onClick={inputNum}>
            .
          </button>
          <button className="equalsPad" onClick={equals}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
