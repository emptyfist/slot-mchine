import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import 'scss/react-images.scss';
import 'scss/slick-slider.scss';

import 'scss/common.scss';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>Slot Machine Game</title>
        <meta
          name="Slot machine game"
          content="a simple slot machine game, with a little twist"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
