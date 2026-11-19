
import "./tictactoe.css";
import circleChoice from "../assets/circlesign.jpg";
import crossChoice from "../assets/xsign.jpg";
import { useState } from "react";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner(board) {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return board[a];
        }
    }

    return null;
}

function Tictactoe() {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [title, setTitle] = useState("TicTacToe Game");

    const toggle = (num) => {
        // Don't allow moves after a win or on occupied cells
        if (lock || data[num] !== "") return;

        const symbol = count % 2 === 0 ? "x" : "o";

        // Create a new board
        const newData = [...data];
        newData[num] = symbol;

        setData(newData);
        setCount(count + 1);

        // Check winner using the UPDATED board
        const winner = checkWinner(newData);

        if (winner) {
            setLock(true);
            setTitle(
                (winner === "x")
                    ? "Congratulations! Player 1 wins"
                : (winner === "o") 
                    ?"Congratulations! Player 2 wins"
                    : "it's a TIE"
            );
        } else if (count === 8) {
            setLock(true);
            setTitle("It's a draw!");
        }
    };

    const reset = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        setTitle("TicTacToe Game");
    };

    return (
        <div className="container">
            <div className="game-div">

                <h1 className="title">{title}</h1>

                <div className="board">
                    {[0, 1, 2].map((row) => (
                        <div className={`row row${row + 1}`} key={row}>
                            {[0, 1, 2].map((col) => {
                                const index = row * 3 + col;

                                return (
                                    <div className="boxes" key={index} onClick={() => toggle(index)}>
                                        {data[index] && (  <img src={ data[index] === "x" ? crossChoice : circleChoice}alt={data[index]}/>)}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <button className="reset" onClick={reset}>
                    Reset
                </button>

            </div>
        </div>
    );
}

export default Tictactoe;
