import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Items from "./Item";
import cookieSrc from "../cookie.svg";
import useInterval from "../hooks/use-interval.hook"
import useTitle from "../hooks/use-title.hook"
import useKeyDown from "../hooks/use-keydown.hook"

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(1000);
  const [purchasedItems, setPurchasedItems] = useState({cursor: 0, grandma: 0, farm: 0})
  
//  USE EFFECT IN DOCUMENT TITLE
const title = `${numCookies} cookies - Cookie Clicker Game`
const callbackTitle = "Home - Cookie Game"
useTitle(title,callbackTitle)

// USE EFFECT FOR SPACEKEY 
useKeyDown("spacebar", useKeyDown);


// HANDLE CLICK PURCHASES
  const handleClick = (id, cost) => {
    if(numCookies < cost) { return window.alert("not enough cookies!")}
    else {
      setNumCookies(numCookies - cost);
      setPurchasedItems({...purchasedItems, [id]: purchasedItems[id] + 1} );
    }
  };

  //COOKIES per Tick
  const calculateCookiesPerTick = () => {
    let sum = 0;
      const purchasesToArray = Object.values(purchasedItems);
      const itemsToArray = items.map(element => element.value);
        for(let i=0; i< purchasesToArray.length; i++) {
          sum += purchasesToArray[i]*itemsToArray[i];
        }
    return sum;
  }

  useInterval( () => {
      const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
      setNumCookies( numCookies + numOfGeneratedCookies);

  }, 1000);
    
    



  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calculate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button onClick={()=> setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item,index) => {

          let firstItem = index === 0 ? true : false ;

          return (<Items 
            firstItem={firstItem}
            key={index} 
            item={item}
            itemsData={items} 
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems} 
            setPurchasedItems={setPurchasedItems}
            handleClick={handleClick}
          />)
        } )
         }
         
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;



const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
