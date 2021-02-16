import React from 'react';
import { useState, useEffect } from 'react';

import './OffersContainer.scss';
import Offer from '../Offer/Offer';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import { sortVariants } from '../../Constants/SortVariants';
import { useDispatch, useSelector } from 'react-redux';
import { selectOffers, selectRequest } from './OfferContainerSlice';
import { requestStatusTypes } from '../../Constants/RequestStatusTypes';
import Spinner from '../Spinner/Spinner';
import { getOffersAsync } from './OfferContainerSlice';

export default function OffersContainer(props) {
  const dispatch = useDispatch();

  const offers = useSelector(selectOffers);
  const request = useSelector(selectRequest);

  const isOffersLoaded = request.status === requestStatusTypes.SUCCEEDED;
  const [sortBy, setSortBy] = useState(sortVariants.NAME);

  const isSortByName = sortBy === sortVariants.NAME;
  const isSortByCashback = sortBy === sortVariants.CASHBACK;

  useEffect(() => {
    dispatch(getOffersAsync());
  }, []);

  const byNameComparator = (first, second) => {
    if (first.name < second.name) {
      return -1;
    }

    if (first.name > second.name) {
      return 1;
    }

    return 0;
  };

  const byCashbackComparator = (first, second) => {
    const firstCashback = parseFloat(first.cash_back);
    const secondCashback = parseFloat(second.cash_back);

    if (firstCashback > secondCashback) {
      return -1;
    }

    if (firstCashback < secondCashback) {
      return 1;
    }

    return 0;
  };

  let offersList = null;

  if (isSortByName) {
    offersList = offers.sort(byNameComparator).map((value) => {
      return (
        <Offer
          imageURL={value.image_url}
          name={value.name}
          cashback={value.cash_back}
          key={value.offer_id}
        />
      );
    });
  }

  if (isSortByCashback) {
    offersList = offers.sort(byCashbackComparator).map((value) => {
      return (
        <Offer
          imageURL={value.image_url}
          name={value.name}
          cashback={value.cash_back}
          key={value.offer_id}
        />
      );
    });
  }

  const sortValues = [sortVariants.NAME, sortVariants.CASHBACK];

  return (
    <>
      {isOffersLoaded && (
        <>
          <SettingsPanel
            sortVariants={sortValues}
            onChange={(value) => {
              setSortBy(value);
            }}
          />
          <div className={'offers-container'}>{offersList}</div>
        </>
      )}

      {!isOffersLoaded && <Spinner />}
    </>
  );
}
