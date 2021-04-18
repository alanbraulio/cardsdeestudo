import React, { useState, useEffect, useContext } from "react";

import { Store } from "../../Infrastructure/Store/Store";
import { doGetAllApresentations, doUpdateApresensation} from "../../Infrastructure/Actions/Apresentation";
import styles from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";

import Card from "../Card/Card";
import Button from "../Forms/Button";

function Home() {
  const { state, dispatch } = useContext(Store);
  const [screen, setScreen] = useState(0);
  const [showSidebar, setShowSideBar] = useState(false);
  const [idApresentation, setIdApresentation] = useState("");
  const [playCards, setPlayCards] = useState(false);

  useEffect(() => {
    doGetAllApresentations(dispatch);
  }, [dispatch]);


  const handleClickNextApresentation = () => {
    setScreen(screen + 1);
    setShowSideBar(false);
    setIdApresentation('');
    
  };

  const handleClickPreviousApresentation = () => {
    setScreen(screen - 1);
    setShowSideBar(false);
    setIdApresentation('');
  };

  const handleNewCardApresentation = (id) => {
    setIdApresentation(id);
    setShowSideBar(true);
  };

  const updateCard = async (cardatualizado, card) => {
    let cardsAtualizados = [];
    let indexDoCardAtualizado;
    indexDoCardAtualizado = card.index;
    let cards = Object.values(card.apresentacao.descriptor.cards);
    cards.map((newcard, index) => {
      if(index === indexDoCardAtualizado){
        newcard = cardatualizado
      }
      cardsAtualizados.push(newcard)
    })
    const dataApresentation = {
      name: "Alan Braulio",
      descriptor: {
        cards: {
          ...cardsAtualizados,
        },
      },
    };
    try {
      await doUpdateApresensation(
        dispatch,
        card.apresentacao.id,
        dataApresentation
      );
      doGetAllApresentations(dispatch);
    } catch (error) {
      console.log(error);
    }
  }

  const renderCards = (obj) => {
    let apresentacao = obj;
    let cards = Object.values(obj.descriptor.cards);
    return(
      <div className={playCards ? styles.showApresentation : styles.flex}>
        {cards.map((card, index) => {
          card = {...card, index, apresentacao: apresentacao}
          return (
            <>
              <Card
                updateCard={updateCard}
                card={card}
                playCards={playCards}
              />
            </>
          );
        })};
      </div>
    )
  };
  const renderApresentations = () => {
    if (state.allApresentations) {
      return state.allApresentations.map((apresentation, index) => {
        if (index === screen) {
          return (
            <div className={styles.content}>
              {renderActionButtons(apresentation.id)}
              <div className={styles.apresentation}>
                {apresentation.name}
                {renderCards(apresentation)}
              </div>
            </div>
          );
        } else return "";
      });
    }
  };

  const handleCreateNewApresentation = () => {
    setIdApresentation('');
    setShowSideBar(true);
  }
  const handleClickPlayApresentations = (id) => {
    setPlayCards(true);
    setIdApresentation(id);
  };

  const renderPlayApresentation = () => {
    if (state.allApresentations) {
      return state.allApresentations.map((apresentation) => {
        if (apresentation.id === idApresentation) {
          return (
            <div className={styles.playCard}>{renderCards(apresentation)}</div>
          );
        } else return "";
      });
    }
  };

  const checkDisabledNextButton = () => {
    if (state.allApresentations.length === screen + 1 ? true : false) return true;
    else return;
  };
  const checkDisabledPreviouButton = () => {
    if (screen === 0) return true;
    else return;
  };

  const renderActionButtons = (id) => {
    return (
      <div className={styles.actions}>
        <Button onClick={handleCreateNewApresentation}>Criar Apresentação</Button>
        <Button onClick={() => handleNewCardApresentation(id)}>
          Criar Card para a apresentação atual
        </Button>
        <Button onClick={() => handleClickPlayApresentations(id)}>
          Apresentar Cards
        </Button>
        <Button
          disabled={checkDisabledNextButton()}
          onClick={handleClickNextApresentation}
        >
          Próxima apresentação
        </Button>
        <Button
          disabled={checkDisabledPreviouButton()}
          onClick={handleClickPreviousApresentation}
        >
          Apresentação Anterior
        </Button>
        <p>Número de apresentações para serem visualizadas: {state.allApresentations.length}</p>
      </div>
    );
  };

  return (
    <div className={"section"}>
      {showSidebar && (
        <Sidebar
          idApresentation={idApresentation}
          showSidebar={showSidebar}
          setShowSideBar={() => {
            setShowSideBar(!showSidebar);
          }}
        />
      )}
      {playCards && (
        <div className={styles.preview}>
          <div className={styles.contentPreview}>
            {renderPlayApresentation()}
            {
              <Button
                className={styles.closeApresentation}
                onClick={() => setPlayCards(false)}
              >
                Fechar apresentação
              </Button>
            }
          </div>
        </div>
      )}
      <div className={"container"}>{renderApresentations()}</div>
    </div>
  );
}

export default Home;
