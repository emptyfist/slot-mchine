import { withSession } from 'middlewares';

export default withSession(async (req, res) => {

  let curCredits = await req.session.get('credits');
  if (curCredits < 1) 
    return res.status(200).json({withdraw: 0});  

  req.session.set('credits', 0);
  await req.session.save();

  return res.status(200).json({curCredits});  
})
