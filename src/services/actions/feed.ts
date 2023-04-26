import { createAction } from '@reduxjs/toolkit';

export type TFeed = {
	_id: string;
	ingredients: string[];
	status: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	number: number;
};

export type TFeedList = {
	success: boolean;
	orders: TFeed[];
	total: number;
	totalToday: number;
};

export type TFeedState = {
	data: TFeedList | null;
};

export type wsPayloadConnect = {
	wsUrl: string;
	withTokenRefresh: boolean;
};

export const wsConnectFeed = createAction<wsPayloadConnect>('WS_CONNECT_FEED');
export const wsDisconnectFeed = createAction('WS_DISCONNECT_FEED');
export const wsConnectingFeed = createAction('WS_CONNECTING_FEED');
export const wsOpenFeed = createAction('WS_OPEN_FEED');
export const wsCloseFeed = createAction('WS_CLOSE_FEED');
export const wsMessageFeed = createAction<TFeedList>('WS_MESSAGE_FEED');
export const wsErrorFeed = createAction<string | undefined>('WS_ERROR_FEED');

export const wsConnectOrder = createAction<wsPayloadConnect>('WS_CONNECT_ORDER');
export const wsDisconnectOrder = createAction('WS_DISCONNECT_ORDER');
export const wsConnectingOrder = createAction('WS_CONNECTING_ORDER');
export const wsOpenOrder = createAction('WS_OPEN_ORDER');
export const wsCloseOrder = createAction('WS_CLOSE_ORDER');
export const wsMessageOrder = createAction<TFeedList>('WS_MESSAGE_ORDER');
export const wsErrorOrder = createAction<string | undefined>('WS_ERROR_ORDER');
