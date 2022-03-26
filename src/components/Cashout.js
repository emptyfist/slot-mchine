/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { fetchWrapper } from 'helpers';

const Cashout = ({ withdrawn }) => {
  const [position, setPosition] = useState({x: Math.ceil(Math.random() * 100), y: Math.ceil(Math.random() * 100)});
  const [isClickable, setClickable] = useState(false);

  const raffleCash =() => {
    const isMovable = Math.floor(Math.random() * 2);
    if (isMovable > 0) {
      let newPos = {x: 0, y: 0};
      const randPos = Math.floor(Math.random() * 4);
      switch (randPos) {
        case 0: // top
          newPos = {x: position.x, y: position.y - 300};
          break;
        case 1: // right
          newPos = {x: position.x + 300, y: position.y};
          break;
        case 2: // bottom
          newPos = {x: position.x, y: position.y + 300};
          break;
        case 3: // left
          newPos = {x: position.x - 300, y: position.y};
          break;
        default:
          break;
      }

      newPos.x = newPos.x < 0 ? 0 : (newPos.x > window.innerWidth ? window.innerWidth - 100 : newPos.x);
      newPos.y = newPos.y < 0 ? 0 : (newPos.y > window.innerHeight ? window.innerHeight - 100 : newPos.y);

      setPosition({...newPos});
    }

    const isClickable = Math.floor(Math.random() * 5);
    setClickable(isClickable > 1);
  }

  const cashoutClicked = async (e) => {
    if (!isClickable)
      return;

    const result = await fetchWrapper.get('withdraw').then(res => res).catch(err=>0);
    if (result.curCredits === 0) {
      alert('No sufficient credits');
    } else {
      alert(`You've just withdraw ${result.curCredits} credits to your account`);  
      withdrawn(0);
    }
  }

  return (
    <Button 
      className='cash-out'
      sx={{left: `${position.x}px`, top: `${position.y}px`}}
      onMouseOver={() => raffleCash()}
      onClick={cashoutClicked}
    >
      Cash Out
    </Button>
  );
};

export default Cashout;
