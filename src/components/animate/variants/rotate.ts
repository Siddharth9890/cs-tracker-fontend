// import { any} from '../types';
//
import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varRotate = (any?: any) => {
  const durationIn = any?.durationIn;
  const durationOut = any?.durationOut;
  const easeIn = any?.easeIn;
  const easeOut = any?.easeOut;

  return {
    // IN
    in: {
      initial: { opacity: 0, rotate: -360 },
      animate: { opacity: 1, rotate: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { opacity: 0, rotate: -360, transition: varTranExit({ durationOut, easeOut }) },
    },

    // OUT
    out: {
      initial: { opacity: 1, rotate: 0 },
      animate: { opacity: 0, rotate: -360, transition: varTranExit({ durationOut, easeOut }) },
    },
  };
};
