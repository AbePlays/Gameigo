import { motion } from 'framer-motion';
import { Box, BoxProps, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

export const MotionBox = motion<BoxProps>(Box);
export const MotionSimpleGrid = motion<SimpleGridProps>(SimpleGrid);
