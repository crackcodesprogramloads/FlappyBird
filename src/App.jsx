import React from "react";
import "./App.css";
import Bird from "./Bird";
import Obstacle from "./Obstacle";

const BIRD_SIZE = 30;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 4;
const JUMP_HEIGHT = 60;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_GAP = 150;

const BIRD_START_POSITION = 250;
const OBSTACLE_START_HEIGHT = 200;
const OBSTACLE_START_LEFT = GAME_WIDTH - OBSTACLE_WIDTH;

function App() {
  const [birdPosition, setBirdPosition] = React.useState(BIRD_START_POSITION);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [obstacleHeight, setObstacleHeight] = React.useState(
    OBSTACLE_START_HEIGHT
  );
  const [obstacleLeft, setObstacleLeft] = React.useState(OBSTACLE_START_LEFT);
  const [score, setScore] = React.useState(0);

  const bottomObstacleHeight = GAME_HEIGHT - obstacleHeight - OBSTACLE_GAP;

  React.useEffect(() => {
    let timeId;
    if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY);
      }, 24);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [birdPosition, gameStarted]);

  React.useEffect(() => {
    let obstacleId;

    // revised
    if (gameStarted) {
      if (obstacleLeft >= -OBSTACLE_WIDTH) {
        obstacleId = setInterval(() => {
          setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
        }, 24);

        return () => {
          clearInterval(obstacleId);
        };
      } else {
        setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
        setObstacleHeight(
          Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP))
        );
        setScore((score) => {
          return score + 1;
        });
      }
    }
  }, [gameStarted, obstacleLeft]);

  React.useEffect(() => {
    console.log("Line 62-", score);
    const collidedTop = birdPosition >= 0 && birdPosition < obstacleHeight;
    const collidedBottom =
      birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;

    if (
      obstacleLeft >= 0 &&
      obstacleLeft <= OBSTACLE_WIDTH &&
      (collidedTop || collidedBottom)
    ) {
      setGameStarted(false);
      setScore(0);
      setBirdPosition(BIRD_START_POSITION);
      setObstacleHeight(OBSTACLE_START_HEIGHT);
      setObstacleLeft(OBSTACLE_START_LEFT);
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT;
    if (!gameStarted) {
      setGameStarted(true);
    } else if (newBirdPosition < 20) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
    }
  };

  return (
    <div onClick={handleClick} className="Div">
      <div className="Gamebox">
        <Obstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle
          top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
        <Bird size={BIRD_SIZE} top={birdPosition} />
      </div>
      <span style={{ color: "white", fontSize: "24px", position: "absolute" }}>
        {score}
      </span>
    </div>
  );
}

export default App;
