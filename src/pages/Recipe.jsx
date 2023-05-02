import { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { useParams } from 'react-router-dom';


import React from 'react'

function Recipe() {

  let params = useParams(); 
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions"); 

  const fetchDetails = async () => {
    const data = await fetch (`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=6a3285d3e504425994f2cc75158607bb`);
    const detailData = await data.json(); 
    setDetails(detailData);
    console.log(detailData);
  }; 

  useEffect (() => {
    fetchDetails();
  

  }, [params.name]);

  return (
    <DetaileWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")}>Instruction</Button>
        <Button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>

        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
            <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
      </DetaileWrapper>
  )
}

const DetaileWrapper = styled.div `
  margin-top: 10rem; 
  margin-bottom: 5rem; 
  display: flex;

  .active {
    background: linear-gradient(45deg, black, transparent);
    color: white; 
  }

  h2 {
    margin-bottom: 2rem; 

  }

  li {
    font-size: 1.2rem; 
    line-height: 2.5rem; 
  }

  ul {
    margin-top: 2rem;
  }

  p {
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 30px
  }

`;

const Button = styled.div `
padding: 1rem 2rem; 
color: #313131; 
background: white; 
border: 2px solid black; 
margin-right: 2rem; 
font-weight: 600; 
margin-bottom: 5px;

&:hover {
  cursor: pointer;
}

`;

const Info = styled.div `
margin-left: 3rem;

`


export default Recipe