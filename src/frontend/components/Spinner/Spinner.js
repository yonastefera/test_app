import React from 'react';

import './Spinner.scss';

export default function Spinner(props) {
  return (
    <>
      <div className={'loader-wrapper active'}>
        <div className="loader"></div>
      </div>
    </>
  );
}

