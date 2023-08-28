import React from 'react';
import styled from 'styled-components';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  preload: false,
  weight: '500',
});

const getBackgroundColor = (percentage: number) => {
  if (percentage < 50) return '#FF2600';
  if (percentage >= 50 && percentage <= 80) return '#FFC922';
  return '#00D338';
};

const Wrapper = styled.div<{ percentage: number }>`
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 10;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: white;
  background-color: ${({ percentage }) => getBackgroundColor(percentage)};
`;



const ScoreDisplay: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <Wrapper percentage={percentage}>
     <span className={roboto.className}>{percentage}</span>
    </Wrapper>
  );
};

export default ScoreDisplay;
