import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css/sea-green';
import {Link} from "react-router-dom";

function Popular() {

    const [popular, setPopular] = useState([]);
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem("popular"); 

        if (check) {
            setPopular(JSON.parse(check)); 
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=6a3285d3e504425994f2cc75158607bb&number=10`);
            const data = await api.json();
            setPopular(data.recipes);
            console.log(data.recipes);
        }

        
    };

    return (
        <Wrapper>
            <h3>Popular Picks</h3>

            <Splide options={{
                perPage: 3,
                arrow: false,
                pagination: true,
                drag: 'free',
                gap: '3rem',
            }}>
                {popular.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={"/recipe/" + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient></Gradient>
                                </Link>
                            </Card>
                           
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    )
}

const Wrapper = styled.div`
margin: 3rem 0rem;
`;

const Card = styled.div`
min-height: 20rem; 
width: 300px;
border-radius: 2rem;
overflow: hidden; 
position: relative; 
     
    img {
        border-radius: 2rem;
        position: absolute; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        object-fit: cover; 
    }

    p {
        position: absolute; 
        z-index: 10; 
        left: 50%; 
        bottom: 0%; 
        transform: translate(-50%, 0%); 
        color: white; 
        width: 100%;
        text-align: center; 
        font-weight: 600; 
        font-size: 1rem; 
        height: 40%; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
    }
`;

const Gradient = styled.div`
    z-index: 3; 
    position: absolute; 
    width: 100%; 
    height: 100%; 
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;
 



export default Popular;