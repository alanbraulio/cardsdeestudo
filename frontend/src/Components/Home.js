import React, { useState, useEffect, useContext } from "react";

import { Store } from "../Infrastructure/Store/Store";
import { doGetAllApresentations } from "../Infrastructure/Actions/Apresentation";
import styles from "./Home.module.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Card from "../Components/Card/Card";
import Button from "../Components/Forms/Button";

function Home(props) {
  const { state, dispatch } = useContext(Store);
  const [next, setNext] = useState(0);
  const [showSidebar, setShowSideBar] = useState(false);

  let [allCards] = useState([]);

  useEffect(() => {
    doGetAllApresentations(dispatch);
  }, [dispatch]);

  const handleClickNextApresentation = () => {
    setNext(next + 1);
  };

  const handleClickPreviousApresentation = () => {
    setNext(next - 1);
  };

  const handleCreateApresensation = () => {
    setShowSideBar(true);
  };

  const renderCards = (obj) => {
    allCards = Object.values(obj);
    return allCards.map((card, index) => {
      return (
        <Card
          key={index}
          template={card.template}
          question={card.question}
          answer={card.answer}
        />
      );
    });
  };

  const renderApresensations = () => {
    if (state.allApresentations) {
      return state.allApresentations.map((apresensation, index) => {
        if (index === next) {
          return (
            <>
              <div className={styles.header}>
                <Button onClick={handleCreateApresensation}>
                  Criar Apresentação
                </Button>
              </div>
              <div className={styles.apresensation}>
                {apresensation.name}
                {renderCards(apresensation.descriptor.cards)}
              </div>
              <div className={styles.header}>
                <Button onClick={handleClickNextApresentation}>Próximo</Button>
                <Button onClick={handleClickPreviousApresentation}>
                  Anterior
                </Button>
              </div>
            </>
          );
        }else return ''
      });
    }
  };

  return (
    <div className={"section"}>
      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSideBar={() => {
            setShowSideBar(!showSidebar);
          }}
        />
      )}
      <div className={"container"}>{renderApresensations()}</div>
    </div>
  );
}

export default Home;
