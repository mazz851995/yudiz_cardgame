import { useEffect, useState, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, DialogTitle } from "@material-ui/core";
import Card from "./card";
import "./app.scss";
import gameElements from "./gameImages";
import Header from "./Header";




export default function App() {

  const shuffleCards = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  const timeout = useRef(null);

  const [cards, setCards] = useState(shuffleCards(gameElements.concat(gameElements)));
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);



  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === gameElements.length) {
      setShowModal(true);
    }
  };


  const cardEvaluation = () => {
    const [first, second] = openCards;
    setShouldDisableAllCards(false);
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 300);

  };


  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      setShouldDisableAllCards(true);
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };



  useEffect(() => {
    if (openCards.length === 2) cardEvaluation();
    checkCompletion();
  }, [clearedCards, openCards]);


  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setShowModal(false);
    setMoves(0);
    setClearedCards({});
    setOpenCards([]);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(gameElements.concat(gameElements)));
  };

  return (
    <div className="App">
      <Header moves={moves} handleRestart={handleRestart} />

      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card key={index} isInactive={checkIsInactive(card)} isFlipped={checkIsFlipped(index)} card={card} index={index} isDisabled={shouldDisableAllCards} onClick={handleCardClick}
            />
          );
        })}
      </div>
      <Dialog open={showModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Game Complete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game. Your Total Moves : {moves}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
