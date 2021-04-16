import React, { useState, useEffect, useContext } from "react";

import Button from "../Forms/Button";

import styles from "./Sidebar.module.css";
import Input from "../Forms/Input";
import { Store } from "../../Infrastructure/Store/Store";
import {
  doGetAllApresentations,
  doCreateApresentation,
  doUpdateApresensation
} from "../../Infrastructure/Actions/Apresentation";

function Sidebar(props) {
  const { state, dispatch } = useContext(Store);
  const [template, setTemplate] = useState();
  const [screen, setScreen] = useState(1);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [newCards] = useState([]);

  useEffect(() => {
    doGetAllApresentations(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getApresentations();
  }, []);

  const getApresentations = () => {
    if (state.allApresentations && props.idApresentation) {
      state.allApresentations.map((apresentation) => {
        if (apresentation.id === props.idApresentation) {
          return createObjectCard(apresentation);
        } else return "";
      });
    }
  };

  const createObjectCard = (obj) => {
    let allCards = Object.values(obj.descriptor.cards);
    return allCards.map((card) => {
      newCards.push(card);
    });
  };

  const handleUpdateCard = () => {
    let cardUpdate = {
      template: template,
      question: question,
      answer: answer,
    };
    newCards.push(cardUpdate);
    setTemplate("");
    setAnswer("");
    setQuestion("");
    setScreen(screen + 1);
  };

  const handleCreateCard = () => {
    let newCard = {
      template: template,
      question: question,
      answer: answer,
    };
    newCards.push(newCard);
    setTemplate("");
    setAnswer("");
    setQuestion("");
    setScreen(screen + 1);
  };

  const handleCreateApresensation = async () => {
    const dataApresentation = {
      name: "Alan Braulio",
      descriptor: {
        cards: {
          ...newCards,
        },
      },
    };
    try {
      await doCreateApresentation(dispatch, dataApresentation);
      props.setShowSideBar({
        showSideBar: false,
      });
      doGetAllApresentations(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

    const handleUpdateApresensation = async () => {
      const dataApresentation = {
        name: "Alan Braulio",
        descriptor: {
          cards: {
            ...newCards,
          },
        },
        };
        try {
          await doUpdateApresensation(dispatch, props.idApresentation, dataApresentation);
          props.setShowSideBar({
            showSideBar: false,
          });
          doGetAllApresentations(dispatch);
        } catch (error) {
          console.log(error);
        }

    };

  const renderTypeCards = () => {
    return (
      <>
        <div
          onClick={() => setTemplate(1)}
          className={template === 1 ? styles.optionSelected : styles.option}
        >
          <span className={styles.figureRectangular}></span>
          <p>Retangular</p>
        </div>
        <div
          onClick={() => setTemplate(2)}
          className={template === 2 ? styles.optionSelected : styles.option}
        >
          <span className={styles.figurePortrait}></span>
          <p>Retrato</p>
        </div>
        <div
          onClick={() => setTemplate(3)}
          className={template === 3 ? styles.optionSelected : styles.option}
        >
          <div className={styles.figureCircle}></div>
          <p style={{ marginTop: "2.5em" }}>Círculo</p>
        </div>
      </>
    );
  };

  const renderInputsNewCards = () => {
    return (
      <>
        <div>
          <Input
            label="Qual a sua pergunta?"
            type="text"
            value={question}
            name="question"
            onChange={({ target }) => setQuestion(target.value)}
          />
          <Input
            label="Qual a sua resposta?"
            type="text"
            value={answer}
            name="answer"
            onChange={({ target }) => setAnswer(target.value)}
          />
        </div>
      </>
    );
  };
  const renderSideBar = () => {
    return (
      <div className={styles.content}>
        {screen === 1 ? (
          <>
            <p>Selecione o seu tipo de Card</p>
            {renderTypeCards()}
            <Button onClick={() => setScreen(screen + 1)}>
              Cadastrar Informações do Card
            </Button>
          </>
        ) : (
          ""
        )}
        {screen === 2 ? (
          <>
            {renderInputsNewCards()}
            <Button onClick={props.idApresentation ? handleUpdateCard : handleCreateCard}>Cadastrar Card</Button>
          </>
        ) : (
          ""
        )}{
          screen === 3 ? (
            <>
              <Button onClick={() => setScreen(screen - 2)}>
                Cadastrar novo Card
              </Button>
              <Button onClick={props.idApresentation ? handleUpdateApresensation : handleCreateApresensation}>
                Salvar apresentação
              </Button>
            </>
          ):
          ''
        }
      </div>
    );
  };
  return <div className={'animeLeft'}>{renderSideBar()}</div>;
}

export default Sidebar;
