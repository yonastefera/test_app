import {configureStore} from '@reduxjs/toolkit';

import offersReducer from "./frontend/components/OffersContainer/OfferContainerSlice";

export const store = configureStore({
    reducer: {
        offersContainer: offersReducer
    }
});
