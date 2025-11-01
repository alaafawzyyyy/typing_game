import { useEffect, useRef, useState } from "react";

function Game() {
  const TIME_REMAINING = 10;
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);

  const textAreaRef = useRef(null);

  function handleClick() {
    startGame();
  }

  const handleTyping = (e) => {
    const currentText = e.target.value;
    setText(currentText);
    setWordCount(CountWords(currentText));
  };

  const startGame = () => {
    setText("");
    setTimeRemaining(10);
    setIsPlaying(true);
    setWordCount(0);
    setWordsPerMinute(0);
    setTimeout(() => textAreaRef.current.focus(), 0);
  };

  useEffect(() => {
    if (timeRemaining > 0 && isPlaying) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    }
    if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isPlaying]);

  const endGame = () => {
    setIsPlaying(false);
    setWordsPerMinute(getTypingSpeed(wordCount));
  };

  const CountWords = (inputText) => {
    const wordsArray = inputText.trim().split(" ");
    return wordsArray.length;
  };

  const getTypingSpeed = (inputNumber) => {
    return inputNumber * 6;
  };

  return (
    <main>
      <h1>How fast do you type? </h1>
      <textarea
        placeholder={"Press the Start button to begin the game."}
        value={text}
        onChange={handleTyping}
        disabled={!isPlaying}
        ref={textAreaRef}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={handleClick} disabled={isPlaying}>
        START
      </button>
      <h1>Word Count:{wordCount ? wordCount : " ???"} </h1>
      {wordsPerMinute
        ? `your typing speed is ${wordsPerMinute} per minute.`
        : ""}
    </main>
  );
}
export default Game;
