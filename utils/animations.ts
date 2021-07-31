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
