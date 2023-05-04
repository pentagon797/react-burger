import orderReducer, { sendOrder, initialState } from './orderSlice';
import { testOrder } from "../../utils/tests";

describe('burgerOrderInfoSlice reducer', () => {
	it('should return initial state', () => {
		expect(orderReducer(initialState, { type: '' })).toEqual(
			initialState
		);
	});

	it('should hanlde sendOrder fulfilled', () => {
		expect(
			orderReducer(initialState, {
				payload: testOrder,
				type: sendOrder.fulfilled
			})
		).toEqual({ ...initialState, order: testOrder, isLoading: false });
	});

	it('should return sendOrder pending', () => {
		expect(
			orderReducer(initialState, {
				payload: testOrder,
				type: sendOrder.pending
			})
		).toEqual({ ...initialState, isLoading: true });
	});

	it('should return sendOrder rejected', () => {
		expect(
			orderReducer(initialState, {
				payload: testOrder,
				type: sendOrder.rejected
			})
		).toEqual({ ...initialState, isLoading: false });
	});
});
