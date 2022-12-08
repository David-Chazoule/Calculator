import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

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
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
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

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };

  return (
    <div className="container">
      <div className="calculator-box">
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
          <button name="%" onClick={percent}>
            %
          </button>
          <button name="CE" onClick={""}>
            CE
          </button>
          <button onClick={""}>C</button>
          <button onClick={reset}>X</button>
          <button name="" onClick={""}>
            1/x
          </button>
          <button name="" onClick={""}>
            x²
          </button>
          <button name="" onClick={""}>
            ²Vx
          </button>
          <button name="/" onClick={operatorType}>
            &divide;
          </button>
          <button name="7" onClick={inputNum}>
            7
          </button>
          <button name="8" onClick={inputNum}>
            8
          </button>
          <button name="9" onClick={inputNum}>
            9
          </button>
          <button name="*" onClick={operatorType}>
            &times;
          </button>
          <button name="4" onClick={inputNum}>
            4
          </button>
          <button name="5" onClick={inputNum}>
            5
          </button>
          <button name="6" onClick={inputNum}>
            6
          </button>
          <button name="-" onClick={operatorType}>
            &ndash;
          </button>
          <button name="1" onClick={inputNum}>
            1
          </button>
          <button name="2" onClick={inputNum}>
            2
          </button>
          <button name="3" onClick={inputNum}>
            3
          </button>
          <button name="+" onClick={operatorType}>
            +
          </button>
          <button name="" onClick={minusPlus}>
            -/+
          </button>
          <button name="0" onClick={inputNum}>
            0
          </button>
          <button name="." onClick={inputNum}>
            .
          </button>
          <button onClick={equals}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
