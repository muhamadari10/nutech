import BarangReducer, {
  increment,
  decrement,
  incrementByAmount,
} from './barangSlice';

describe('Barang reducer', () => {
  const initialState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(BarangReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = BarangReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = BarangReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = BarangReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
