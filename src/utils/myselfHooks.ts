/*
 * @Author: your name
 * @Date: 2021-06-23 20:37:34
 * @LastEditTime: 2021-07-09 03:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\utils\useInterval.ts
 */
import { useEffect, useRef } from 'react';

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef<any>();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
