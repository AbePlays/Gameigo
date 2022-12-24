export const FadeUpAnimation = {
  parent: {
    hidden: {},
    show: { transition: { staggerChildren: 0.3 } },
  },
  child: {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
};

export const PageAnimation = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const MoveDownAnimation = {
  hidden: { height: '0' },
  show: { height: '64px', transition: { duration: 0.5 } },
  exit: { height: '0', transition: { delay: 0.8, duration: 0.5 } },
};

export const NavbarListAnimation = {
  hidden: {},
  show: { transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.2 } },
};

export const NavbarItemAnimation = {
  hidden: { opacity: 0, y: '10px' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: '10px',
    transition: { duration: 0.5 },
  },
};
