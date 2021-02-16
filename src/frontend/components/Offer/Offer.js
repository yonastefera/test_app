import React from 'react';

import './Offer.scss';

export default function Offer(props) {
  return (
    <div className={'offer'}>
      <div className={'offer-content__item'}>
        <div className={'offer-image'}>
          <img src={props.imageURL} alt="Offer Image" />
        </div>

        <div className={'offer-name'}>
          <span>{props.name}</span>
        </div>
      </div>

      <div className={'offer-content__item'}>
        <div className={'offer-cashback'}>
          <span>{parseFloat(props.cashback)}$</span>
        </div>
      </div>
    </div>
  );
}
