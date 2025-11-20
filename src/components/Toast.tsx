import React from 'react';

import { ToastContainer, type ToastTransitionProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'motion/react';

import { useAnimationConfig } from '@/hooks';
import { motionVariants } from '@/utils/motionVariants';

const MotionToastTransition = ({
  children,
  isIn,
  nodeRef: _nodeRef,
  done,
  preventExitTransition,
  playToast,
  ref,
}: ToastTransitionProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const { getTransition } = useAnimationConfig();
  const assignRefs = (instance: HTMLDivElement | null) => {
    if (typeof ref === 'function') {
      ref(instance);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = instance;
    }
  };

  if (!isIn && preventExitTransition) {
    done();
    return (
      <div ref={assignRefs} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={assignRefs}
      initial={motionVariants.exit.toast.initial}
      animate={
        isIn
          ? motionVariants.exit.toast.animate
          : motionVariants.exit.toast.exit
      }
      transition={getTransition('snappy', { duration: 0.32 })}
      onAnimationComplete={() => {
        if (isIn) {
          playToast();
        } else {
          done();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// MotionToastTransition.displayName = 'MotionToastTransition';

// Component for displaying toast notifications
function Toast(): React.JSX.Element {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      transition={MotionToastTransition}
    />
  );
}

export default Toast;
