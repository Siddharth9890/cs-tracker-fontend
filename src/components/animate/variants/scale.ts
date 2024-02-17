// import { any} from '../types';
import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varScale = (any?: any) => {
  const durationIn = any?.durationIn;
  const durationOut = any?.durationOut;
  const easeIn = any?.easeIn;
  const easeOut = any?.easeOut;

  return {
    // IN
    inX: {
      initial: { scaleX: 0, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scaleX: 0, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },
    inY: {
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scaleY: 0, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },

    // OUT
    outX: {
      initial: { scaleX: 1, opacity: 1 },
      animate: { scaleX: 0, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
    },
    outY: {
      initial: { scaleY: 1, opacity: 1 },
      animate: { scaleY: 0, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
    },
  };
};
