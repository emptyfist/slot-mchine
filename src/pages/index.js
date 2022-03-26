import React, { useState } from 'react';
import { withSession } from 'middlewares';
import { Cashout, SlotMachine } from '../components';
import { Box } from '@mui/material';

const IndexPage = ({ credits }) => {
  const [curCredits, setCredits] = useState(credits);

  return (
    <Box className='main-container'>
      <SlotMachine credits={curCredits} />
      <Cashout withdrawn={setCredits} />
    </Box>
  );
};

export const getServerSideProps = withSession(async function ({req, res}) {
  let credits = req.session.get('credits')
  if (!credits || credits < 1) {
    credits = 10;
    req.session.set('credits', credits);
    await req.session.save();
  }

  return {
    props: {credits},
  }
});

export default IndexPage;
