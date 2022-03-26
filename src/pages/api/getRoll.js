import { withSession } from 'middlewares';

export default withSession(async (req, res) => {

  let curCredits = await req.session.get('credits');
  if (curCredits <= 0) {
    return res.status(200).json({status: 'err', msg: 'No sufficient credits'});
  }

  let first = Math.floor(Math.random() * 4);
  let second = Math.floor(Math.random() * 4);
  let third = Math.floor(Math.random() * 4);

  if (first === second && second === third) {
    // determine to give permission to client
    let reRoll = false;
    if (curCredits >= 60) {
      reRoll = Math.floor(Math.random() * 3) < 2;
    } else if (curCredits >= 40) {
      reRoll = Math.floor(Math.random() * 3) < 1;
    }

    if (reRoll) {
      // reroll when true
      first = Math.floor(Math.random() * 4);
      second = Math.floor(Math.random() * 4);
      third = Math.floor(Math.random() * 4);
    }

    if (first === second && second === third) {
      switch (first) {
        case 0:
          curCredits += 10;
          break;
        case 1:
          curCredits += 20;
          break;
        case 2:
          curCredits += 30;
          break;
        case 3:
          curCredits += 40;
          break;
        default:
          break;
      }
    }
  } else {
    curCredits -= 1;
  }

  req.session.set('credits', curCredits);
  await req.session.save();

  return res.status(200).json({status: 'ok', data:{first, second, third, credits: curCredits}});  
})
