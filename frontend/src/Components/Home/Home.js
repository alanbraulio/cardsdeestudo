import React, { useState, useEffect, useContext } from "react";

import { Store } from "../../Infrastructure/Store/Store";
import { doGetAllApresentations } from "../../Infrastructure/Actions/Apresentation";
import styles from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";

import Card from "../Card/Card";
import Button from "../Forms/Button";

function Home() {
  const { state, dispatch } = useContext(Store);
  const [next, setNext] = useState(0);
  const [showSidebar, setShowSideBar] = useState(false);
  const [idApresentation, setIdApresentation] = useState("");
  const [playCards, setPlayCards] = useState(false);
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    doGetAllApresentations(dispatch);
  }, [dispatch]);

  // useEffect(() => {
  //   setAllCards(state.allApresentations);
  // }, [state]);

  const handleClickNextApresentation = () => {
    setNext(next + 1);
    setShowSideBar(false);
    setIdApresentation('');
    
  };

  const handleClickPreviousApresentation = () => {
    setNext(next - 1);
    setShowSideBar(false);
    setIdApresentation('');
  };

  const handleNewCardApresentation = (id) => {
    setIdApresentation(id);
    setShowSideBar(true);
  };

  const handleblabla = (apresentation) => {
    setAllCards(apresentation.descriptor.cards)
  }

  const updateCards = (cards) => {
    console.log(allCards, 'allCards')
    // let teste = allCards.map((apresentation, index) => {
    //   if(index == cards.templateId){
    //       cards
    //       apresentation.descriptor.cards
    //      )
    //   }
    // })
    // console.log(teste, 'teste')
    // // let teste = allCards;
    // teste[cards.index] = cards;

    // setAllCards(teste);
    console.log(cards, 'card que eu to alterando')
  }

  const renderCards = (obj) => {
    let cards = Object.values(obj.descriptor.cards);
    return cards.map((card, index) => {
      card = {...card, index, templateId: obj.id}
      return (
        <Card
          updateCards={updateCards}
          card={card}
          playCards={playCards}
        />
      );
    });
  };
  const renderApresentations = () => {
    if (state.allApresentations) {
      return state.allApresentations.map((apresentation, index) => {
        if (index === next) {
          return (
            <div style={{ position: "relative" }}>
              {/* {handleblabla(apresentation)} */}
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
    if (state.allApresentations.length === next + 1 ? true : false) return true;
    else return;
  };
  const checkDisabledPreviouButton = () => {
    if (next === 0) return true;
    else return;
  };

  const renderActionButtons = (id) => {
    return (
      <div className={styles.actions}>
        <Button onClick={() => setShowSideBar(true)}>Criar Apresentação</Button>
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
      )}
      <div className={"container"}>{renderApresentations()}</div>
    </div>
  );
}

export default Home;
