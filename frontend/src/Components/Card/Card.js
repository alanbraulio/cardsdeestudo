import React, { useState } from "react";
import styles from "./Card.module.css";
import Edit from "@material-ui/icons/Edit";
import Input from "../../Components/Forms/Input";

function Card(props) {
  const [showEditCard, setShowEditCard] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState(props.question);
  const [answer] = useState(props.answer);
  const [template] = useState(props.template);

  const handleShowEditCard = () => {
    setShowEditCard(true);
  };

  const handleShowAnwser = () => {
    setShowAnswer(true);
  };
  return (
    <div
      className={
        template === 1
          ? styles.rectangularCard
          : template === 2
          ? styles.portraitCard
          : styles.circleCard
      }
    >
      <Edit className={styles.editCard} onClick={handleShowEditCard} />
      {showEditCard ? (
        <Input
          label="Pergunta"
          type="text"
          value={question}
          name="question"
          onChange={({ target }) => setQuestion(target.value)}
        />
      ) : (
        question
      )}

      <button onClick={handleShowAnwser}>Ver resposta</button>
      {showAnswer ? answer : ""}
    </div>
  );
}
export default Card;
