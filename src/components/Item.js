import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



const Items = ({firstItem, item, numCookies,setNumCookies,purchasedItems,setPurchasedItems, handleClick}) => {
    const { name, cost, value, id, firstName } = item

const ref = useRef(null);
const targetBtn = () => {
    if(firstItem) {
        console.log(ref.current);
        ref.current.focus();
    }
};

useEffect(() => {
    targetBtn()
}, []) ;




    return (
        <Wrapper ref={ref} onClick={() => handleClick(id,cost)}>
            <div>
            <Name >{name}</Name> 
            <p>Cost: {cost} cookie(s). Produces {value} cookie(s)/second.</p>
            </div>
            <Purchase>{purchasedItems[id]}</Purchase>
        </Wrapper>
    )

};


const Wrapper = styled.button `
text-align: left;
font-size: 1.5rem;
color: white;
border: none;
background: transparent;
cursor: pointer;

width: 450px;
border-bottom : 1px solid grey;
padding-bottom: 10px;
margin-bottom: 10px;
display:flex;
justify-content: space-between;
background-color: none;

p {
font-size: 1rem;
}
`;


const Name = styled.div`

`;


const Purchase = styled.div `
margin-right:5px;
font-size: 2rem;
align-self: center;
`


export default Items;




