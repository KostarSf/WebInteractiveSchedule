import userReducer from './userSlice';

describe('user reducer', () => {
    it('should handle initial state', () => {
        expect(userReducer(undefined, { type: 'unknown'})).toEqual({
            status: 'blank'
        });
    });
})
