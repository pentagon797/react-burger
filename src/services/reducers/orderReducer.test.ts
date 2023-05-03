import { ordersReducer } from "./orderReducer";
import { 
  wsOpenOrder, 
  wsCloseOrder, 
  wsErrorOrder, 
  wsMessageOrder 
  } from '../actions/feed';

  describe('orderReducer', () => {
    const initialState = {
      data: null,
    };
  
    it('should handle wsOpenFeed', () => {
      expect(
        ordersReducer(undefined, {
          type: wsOpenOrder.type,
        })
      ).toEqual(initialState);
    });
  
    it('should handle wsCloseFeed', () => {
      expect(
        ordersReducer(undefined, {
          type: wsCloseOrder.type,
        })
      ).toEqual(initialState);
    });
  
    it('should handle wsErrorFeed', () => {
      expect(
        ordersReducer(undefined, {
          type: wsErrorOrder.type,
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
      const action = wsMessageOrder(orderList);
      const state = ordersReducer(initialState, action);
      const expectedState = {
        data: orderList,
      };
      expect(state).toEqual(expectedState);
    });
  });