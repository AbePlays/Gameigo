export const FadeUpAnimation = {
  parent: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  },
  child: {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
};

export const PageAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const MoveDownAnimation = {
  hidden: {
    y: '-100vh',
  },
  show: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: '-100vh',
    transition: {
      delay: 0.9,
      duration: 0.5,
    },
  },
};

export const NavbarListAnimation = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const NavbarItemAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.5,
    },
  },
};

export const CloseButtonAnimation = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.2,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.1,
    },
  },
};
