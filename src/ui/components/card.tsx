'use client'
import React from 'react';
import styled from 'styled-components';
import ScoreDisplay from './score';
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '500',
  preload: false,

});

const GlossEffect = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0; 
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.2) 100%);
  transition: opacity 0.3s ease-in-out; 
  `;

const CardContainer = styled.div`
  width: 14rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position:  relative;
  border-radius: 2px; 
  cursor: pointer;  
  align-items: flex-start;  
  transition: transform 0.2s ease-in-out;  
  background-color: #1E1E1E; 
  box-shadow: -6px 2px 8px -1px rgba(255,255,255,0.23);
      &:hover {
    transform: scale(1.05); 

    ${GlossEffect} { // Quando o CardContainer for hoverado, mude a opacidade do GlossEffect
      opacity: .9;
    }
    
  }
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const LabelContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 1rem;
width: 14rem;
label{
  color: #5b5b5b
};
span {
  margin:0
}
`

interface ICard {
    imageUrl: string
    percentage: number
    name: string
}

const Card = ({ imageUrl, percentage, name }: ICard) => (
  <div style={{display: 'flex', justifyContent:'center' , flexDirection:'column', color: 'rgb(245, 245, 245)', height: '100%'}}>
  <CardContainer>
    <Image src={imageUrl} alt="Card" />
    <GlossEffect />
    <ScoreDisplay percentage={percentage} />  
  </CardContainer>
  <LabelContainer>
  <label  className={roboto.className}>Title</label>
    <span className={roboto.className}>{name}</span>
    </LabelContainer>
    </div>
);

export default Card;
