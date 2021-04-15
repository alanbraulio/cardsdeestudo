import React, { useState, useEffect, useContext } from "react";

// import CustomSnackbar from "../Components/Snackbar/Snackbar";
import Button from "../Forms/Button";

import styles from "./Sidebar.module.css";
import Input from "../Forms/Input";
import { Store } from "../../Infrastructure/Store/Store";
import { doGetAllApresentations, doCreateApresentation } from "../../Infrastructure/Actions/Apresentation";

function Sidebar(props) {
  const { dispatch } = useContext(Store);
  const [template, setTemplate] = useState();
  const [screen, setScreen] = useState(1);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [newCards] = useState([]);

  useEffect(() => {
    doGetAllApresentations(dispatch);
  }, [dispatch]);

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
    setScreen(screen - 1);
  };

  const handleSaveApresensation = async () => {
    const dataApresentation = {
      name: "Alan Braulio",
      descriptor: {
        cards: {
          ...newCards,
        },
      },
    };

    try {
      await doCreateApresentation(dispatch, dataApresentation).then((res) => {
        console.log(res, 'resposta api')
      });
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
        <div>
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
            <p> {newCards.length === 0 ? 'Selecione o seu tipo de Card' : 'Selecione o modelo do próximo Card ou Clique em Salvar Apresentação'}</p>
            {renderTypeCards()}
            <Button onClick={() => setScreen(screen + 1)}>
              Cadastrar Informações do Card
            </Button>
            {newCards.length > 0 ? (
              <Button onClick={handleSaveApresensation}>
                Salvar aprsentação
              </Button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {screen === 2 ? (
          <>
            {renderInputsNewCards()}
            <Button onClick={handleCreateCard}>Cadastrar Card</Button>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };
  return <div>{renderSideBar()}</div>;
}

export default Sidebar;
