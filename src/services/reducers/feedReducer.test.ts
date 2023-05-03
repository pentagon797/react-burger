import { feedReducer } from './feedReducer';
import {
  wsOpenFeed,
  wsCloseFeed,
  wsMessageFeed,
  wsErrorFeed,
} from '../actions/feed';

describe('feedReducer', () => {
  const initialState = {
    data: null,
  };

  it('should handle wsOpenFeed', () => {
    expect(
      feedReducer(undefined, {
        type: wsOpenFeed.type,
      })
    ).toEqual(initialState);
  });

  it('should handle wsCloseFeed', () => {
    expect(
      feedReducer(undefined, {
        type: wsCloseFeed.type,
      })
    ).toEqual(initialState);
  });

  it('should handle wsErrorFeed', () => {
    expect(
      feedReducer(undefined, {
        type: wsErrorFeed.type,
      })
    ).toEqual(initialState);
  });

  it('should handle wsMessageFeed', () => {
    const orderList = {
      orders: [],
      total: 0,
      totalToday: 0,
      success: true,
    };
    const action = wsMessageFeed(orderList);
    const state = feedReducer(initialState, action);
    const expectedState = {
      data: orderList,
    };
    expect(state).toEqual(expectedState);
  });
});
