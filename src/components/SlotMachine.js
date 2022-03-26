/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { fetchWrapper } from 'helpers';
import Slot from './Slot';

const SlotMachine = ({ credits }) => {
  const [isRunning, setRunning] = useState(false);
  const [showCredit, setShowCredit] = useState(0);
  const [rolResult, setRolResult] = useState({first: 0, second: 0, third: 0, credits: credits});


  useEffect(() => {
    setShowCredit(credits);
  }, [credits]);

  const startClicked = async (e) => {
    const result = await fetchWrapper.get('getRoll').then(res => {
      if (res.status !== 'ok') {
        alert(res.msg);
        return {first: 0, second: 0, third: 0, credits: -1}
      }

      return res.data;
    }).catch(err=>{
      return {first: 0, second: 0, third: 0, credits: -1}
    });

    if (result.credits < 0)
      return;

    setRolResult({...result});
    setRunning(true);
  }

  const setRollResult = () => {
    setRunning(false);
    setShowCredit(rolResult.credits);
  }

  return (
    <Box className='slot-machine-wrapper'>
      <Typography variant={'h2'}>Welcome to Slot Game!</Typography>
      <Typography variant={'h5'}>{`You current credits: ${showCredit}`}</Typography>
      <Box
        display={'flex'} 
        component={'img'}
        sx={{margin: '0 auto'}}
        src={'/images/slot-machine.svg'}
        width={500}
        height={500}
      >
      </Box>
      <Box className='slot-control-wrapper'>
        <Slot isStarted={isRunning} pos={1} result={rolResult.first} />
        <Slot isStarted={isRunning} pos={2} result={rolResult.second}/>
        <Slot isStarted={isRunning} pos={3} result={rolResult.third} setDone={setRollResult} />
      </Box>
      <Box className='controller-wrapper'>
        <Button 
          onClick={startClicked}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Start'}
        </Button>
      </Box>
    </Box>
  );
};

export default SlotMachine;
