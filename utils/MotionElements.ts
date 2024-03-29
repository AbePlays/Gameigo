import { motion } from 'framer-motion';
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  ListItem,
  ListItemProps,
  ListProps,
  Stack,
  StackProps,
  UnorderedList,
} from '@chakra-ui/react';

export const MotionBox = motion<BoxProps>(Box);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionListItem = motion<ListItemProps>(ListItem);
export const MotionStack = motion<StackProps>(Stack);
export const MotionUnorderedList = motion<ListProps>(UnorderedList);
