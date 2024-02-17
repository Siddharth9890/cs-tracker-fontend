// import { any, any, any } from '../types';

// ----------------------------------------------------------------------

export const varTranHover = (any?: any) => {
  const duration = any?.duration || 0.32;
  const ease = any?.ease || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

export const varTranEnter = (any?: any) => {
  const duration = any?.durationIn || 0.64;
  const ease = any?.easeIn || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

export const varTranExit = (any?: any) => {
  const duration = any?.durationOut || 0.48;
  const ease = any?.easeOut || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};
