// ----------------------------------------------------------------------

export type Props = {
  staggerIn?: number;
  delayIn?: number;
  staggerOut?: number;
};

export const varContainer = (any?: any) => {
  const staggerIn = any?.staggerIn || 0.05;
  const delayIn = any?.staggerIn || 0.05;
  const staggerOut = any?.staggerIn || 0.05;

  return {
    animate: {
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut,
        staggerDirection: -1,
      },
    },
  };
};
