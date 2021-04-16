import React, { useState } from "react";
import styles from "./Card.module.css";
import Edit from "@material-ui/icons/Edit";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";

function Card(props) {
  const [showEditCard, setShowEditCard] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState(props.card.question);
  const [answer] = useState(props.card.answer);
  const [template] = useState(props.card.template);

  const handleShowEditCard = () => {
    setShowEditCard(true);
  };

  const handleSalveCard = () => {
    setShowEditCard(false);
    props.updateCards(props.card);
  };

  const handleShowAnwser = () => {
    setShowAnswer(true);
  };
  const renderCard = () => {
    return (
      <div className={showAnswer ? "rotate" : ""}>
        <div
          className={
            template === 1
              ? styles.rectangularCard
              : template === 2
              ? styles.portraitCard
              : styles.circleCard
          }
        >
          {!showAnswer ? (
            <>
              <div className={styles.headerCard}>
                {props.playCards ? (
                  ""
                ) : (
                  <Edit
                    className={styles.editCard}
                    onClick={handleShowEditCard}
                  />
                )}
              </div>
              {showEditCard ? (
                <>
                  <Input
                    label="Escreva a nova pergunta"
                    type="text"
                    value={question}
                    name="question"
                    onChange={({ target }) => setQuestion(target.value)}
                  />
                  <Button onClick={() => handleSalveCard()}>
                    Salvar Pergunta
                  </Button>
                </>
              ) : (
                question
              )}
              {props.playCards ? (
                <Button onClick={() => handleShowAnwser()}>Ver resposta</Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {showAnswer ? answer : ""}
        </div>
      </div>
    );
  };
  return renderCard();
}
export default Card;
