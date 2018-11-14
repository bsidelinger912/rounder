/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  markup: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired,
};

const Html = ({ markup, initialState }) => {
  // const scriptContents = `window.__data = ${JSON.stringify(currentState).replace(/<\//g, '<\\/')};`;
  const scriptContents = `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};`;

  return (
    <html lang="en-US">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>Rounder</title>

        <link href="http://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css" />
        <link href="/icomoon/style.css" rel="stylesheet" type="text/css" />
        <link href="/ssr/styles.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: scriptContents }} />
        <div id="react-root" dangerouslySetInnerHTML={{ __html: markup }} />
        <div id="modal-root" />
        <script src="http://localhost:8080/bundle.js" />
      </body>
    </html>
  );
};

Html.propTypes = propTypes;

export default Html;
