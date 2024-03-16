import React, { useState } from "react";
import "./App.css";

function App() {
  // สถานะของแอปพลิเคชัน
  const [input, setInput] = useState("0"); // ค่าที่แสดงบนหน้าจอ
  const [prevValue, setPrevValue] = useState(""); // ค่าที่ป้อนก่อนหน้า
  const [operator, setOperator] = useState(""); // operator

  // ฟังก์ชันที่จัดการกับการกดปุ่มตัวเลข
  const handleButtonPress = (val) => {
    if (input.length < 16) {
      // ผลลัพธ์จะต้องไม่เกิน 16 ตัว เพื่อให้พอดีกับ .display css ที่ทำไว้ ถ้าเกินจะขึ้น Error
      if (input === "0" || input === "Error") {
        setInput(val);
      } else {
        setInput((prevInput) => prevInput + val);
      }
    }
  };

  // ฟังก์ชันที่จัดการกับการกดปุ่ม operator
  const handleOperatorPress = (val) => {
    setOperator(val); // บันทึกตัวดำเนินการ
    setPrevValue(input); // บันทึกค่าปัจจุบันลงในค่าที่ป้อนก่อนหน้า
    setInput("0"); // เริ่มการคำนวณใหม่
  };

  // ฟังก์ชันที่คำนวณผลลัพธ์
  const calculateResult = () => {
    const currentValue = parseFloat(input);
    const previousValue = parseFloat(prevValue);

    let result;
    switch (operator) {
      case "+":
        result = previousValue + currentValue;
        break;
      case "-":
        result = previousValue - currentValue;
        break;
      case "*":
        result = previousValue * currentValue;
        break;
      case "/":
        if (currentValue !== 0) {
          result = previousValue / currentValue;
        } else {
          setInput("Error");
          setPrevValue("");
          setOperator("");
          return;
        }
        break;
      default:
        break;
    }

    if (Number.isInteger(result)) {
      setInput(result.toString()); // แสดงผลเป็นสตริง ถ้าเป็นจำนวนเต็ม ไม่ต้องแสดงจุดทศนิยม เช่น 3*2 = 6 ต้องไม่เป็น 6.00000000
    } else if (!isNaN(result)) {
      setInput(result.toFixed(8)); // ถ้าผลลัพธ์มีจุดทศนิยม ให้แสดงผลทศนิยม 8 ตำแหน่ง เพื่อไม่ให้มากเกินไป (ความสวยงาม)
    } else {
      setInput("Error");
    }

    setPrevValue("");
    setOperator("");
  };

  // ฟังก์ชันที่เคลียร์ค่า
  const clearInput = () => {
    setInput("0");
    setPrevValue("");
    setOperator("");
  };

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        {/* ตัวเลข 0 - 9 และเครื่องหมาย +, -, *, / */}
        <div className="row">
          <button className="number" onClick={() => handleButtonPress("7")}>
            7
          </button>
          <button className="number" onClick={() => handleButtonPress("8")}>
            8
          </button>
          <button className="number" onClick={() => handleButtonPress("9")}>
            9
          </button>
          <button className="pad" onClick={() => handleOperatorPress("/")}>
            ÷
          </button>
        </div>
        <div className="row">
          <button className="number" onClick={() => handleButtonPress("4")}>
            4
          </button>
          <button className="number" onClick={() => handleButtonPress("5")}>
            5
          </button>
          <button className="number" onClick={() => handleButtonPress("6")}>
            6
          </button>
          <button className="pad" onClick={() => handleOperatorPress("*")}>
            x
          </button>
        </div>
        <div className="row">
          <button className="number" onClick={() => handleButtonPress("1")}>
            1
          </button>
          <button className="number" onClick={() => handleButtonPress("2")}>
            2
          </button>
          <button className="number" onClick={() => handleButtonPress("3")}>
            3
          </button>
          <button className="pad" onClick={() => handleOperatorPress("-")}>
            -
          </button>
        </div>
        <div className="row">
          <button className="number" onClick={() => handleButtonPress("0")}>
            0
          </button>
          <button className="pad" onClick={() => handleButtonPress(".")}>
            .
          </button>
          <button className="sum" onClick={calculateResult}>
            =
          </button>
          <button className="pad" onClick={() => handleOperatorPress("+")}>
            +
          </button>
        </div>
        {/* ปุ่มล้างค่า */}
        <div className="row">
          <button className="clear" onClick={clearInput}>
            C
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
