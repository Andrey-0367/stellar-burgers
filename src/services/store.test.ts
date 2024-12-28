import { expect, describe } from '@jest/globals';
import store, { rootReducer } from './store';

describe('rootReducer', () => {
  it('rootReduce correctly', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(state);
  });
});
