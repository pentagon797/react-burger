import { createReducer } from '@reduxjs/toolkit';

import {
	wsCloseOrder,
	wsErrorOrder,
	wsMessageOrder,
	wsOpenOrder
} from '../actions/feed';
import { TFeedState } from '../actions/feed';

const initialOrderState: TFeedState = {
	data: null
};

export const ordersReducer = createReducer(initialOrderState, (builder) => {
	builder
		.addCase(wsOpenOrder, () => {
			console.log('OPEN WEBSOCKET');
		})
		.addCase(wsCloseOrder, () => {
			console.log('CLOSE WEBSOCKET');
		})
		.addCase(wsErrorOrder, () => {
			console.log('error');
		})
		.addCase(wsMessageOrder, (state, action) => {
			state.data = action.payload;
		});
});
