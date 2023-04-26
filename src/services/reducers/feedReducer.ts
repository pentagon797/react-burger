import { createReducer } from '@reduxjs/toolkit';

import {
	wsCloseFeed,
	wsErrorFeed,
	wsMessageFeed,
	wsOpenFeed
} from '../actions/feed';
import { TFeedState } from '../actions/feed';

const initialFeedState: TFeedState = {
	data: null
};

export const feedReducer = createReducer(initialFeedState, (builder) => {
	builder
		.addCase(wsOpenFeed, () => {
			console.log('OPEN WEBSOCKET');
		})
		.addCase(wsCloseFeed, () => {
			console.log('CLOSE WEBSOCKET');
		})
		.addCase(wsErrorFeed, () => {
			console.log('error');
		})
		.addCase(wsMessageFeed, (state, action) => {
			state.data = action.payload;
		});
});
