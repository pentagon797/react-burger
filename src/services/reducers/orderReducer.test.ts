import { ordersReducer, initialOrderState } from "./orderReducer";
import { 
  wsOpenOrder, 
  wsCloseOrder, 
  wsErrorOrder, 
  wsMessageOrder 
  } from '../actions/feed';

  describe('orderReducer', () => {
  
    it('should handle wsOpenFeed', () => {
      expect(
        ordersReducer(undefined, {
          type: wsOpenOrder.type,
        })
      ).toEqual(initialOrderState);
    });
  
    it('should handle wsCloseFeed', () => {
      expect(
        ordersReducer(undefined, {
          type: wsCloseOrder.type,
        })
      ).toEqual(initialOrderState);
    });
  
    it('should handle wsErrorFeed', () => {
      expect(
        ordersReducer(undefined, {
          type: wsErrorOrder.type,
        })
      ).toEqual(initialOrderState);
    });
  
    it('should handle wsMessageFeed', () => {
      const orderList = {
        orders: [],
        total: 0,
        totalToday: 0,
        success: true,
      };
      const action = wsMessageOrder(orderList);
      const state = ordersReducer(initialOrderState, action);
      const expectedState = {
        data: orderList,
      };
      expect(state).toEqual(expectedState);
    });
  });