import { withIronSession } from 'next-iron-session'
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export { withSession };

function withSession(handler) {
  return withIronSession(handler, {
    password: serverRuntimeConfig.secret,
    cookieName: serverRuntimeConfig.cookie,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? false : false,
    },
  })
};
