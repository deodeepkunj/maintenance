import { renderHook, act, waitFor } from '@testing-library/react';
import { useCountdown } from '@/hooks/use-countdown';
import jest from 'jest'; // Declare the jest variable

describe('useCountdown', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('initializes with correct values', () => {
    const { result } = renderHook(() => useCountdown(5));

    expect(result.current.minutes).toBe(5);
    expect(result.current.seconds).toBe(0);
    expect(result.current.isComplete).toBe(false);
  });

  it('decrements seconds correctly', () => {
    const { result } = renderHook(() => useCountdown(1));

    expect(result.current.seconds).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(59);
  });

  it('decrements minutes when seconds reach 0', () => {
    const { result } = renderHook(() => useCountdown(2));

    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });

    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBe(0);
  });

  it('marks as complete when countdown reaches zero', () => {
    const { result } = renderHook(() => useCountdown(1));

    expect(result.current.isComplete).toBe(false);

    act(() => {
      jest.advanceTimersByTime(60 * 1000 + 1000);
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it('stops timer when complete', () => {
    const { result } = renderHook(() => useCountdown(1));

    act(() => {
      jest.advanceTimersByTime(61 * 1000);
    });

    expect(result.current.isComplete).toBe(true);

    // Advance timer further - should not change values
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });
});
