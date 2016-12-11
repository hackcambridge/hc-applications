import React from 'react';
import Linkify from 'react-linkify';

function newlinesToBreaks(text) {
  return text.split(/\n/g).map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}

/**
 * A piece of longform text in an application. Will automatically
 * break lines and linkify urls. Automatically makes the <p> tag for us.
 */
export default function ApplicationText({ text }) {
  return (
    <p>
      <Linkify properties={{ target: '_blank' }}>
        {newlinesToBreaks(text)}
      </Linkify>
    </p>
  );
}
