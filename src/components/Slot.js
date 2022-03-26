/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import { Box } from '@mui/material';

const SLOT_ITMES = ['C', 'L', 'O', 'W'];

const Slot = ({pos, isStarted, result, setDone = undefined}) => {
  const timerHandler = useRef(null);
  const [visibleIdx, setVisible, visibleRef] = useState(Math.floor(Math.random() * 4));
  const [countable, setCountable, countableRef] = useState(0);

  useEffect(() => {
    if (!isStarted)
      return;
    
    setCountable(0);
    timerHandler.current = setInterval(() => {
      changeVisible();
    }, 200);
  }, [isStarted]);

  const changeVisible = () => {
    if (countableRef.current >= pos * 5) {
      setVisible(result);
      clearInterval(timerHandler.current);

      if (setDone)
        setDone();
      
      return;
    }

    setCountable(prev => prev + 1);
    setVisible(prev => (prev + 1) % 4);
  }

  return (
    <Box className='slot-item'>
      {SLOT_ITMES[visibleIdx]}
    </Box>
  );
};

export default Slot;
