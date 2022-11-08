import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { useColorMode, Link, Stack, Text } from '@chakra-ui/react';

import AboutCard from '@components/AboutCard';
import Page from '@containers/Page';
import { FadeUpAnimation } from '@utils/animations';
import { MotionStack } from '@utils/MotionElements';
import { Descriptions } from 'seo';

const About: FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Page title="About" description={Descriptions.About}>
      <MotionStack
        variants={FadeUpAnimation.parent}
        initial="hidden"
        animate="show"
        maxW="container.xl"
        mx="auto"
        spacing="12"
        textAlign="center"
      >
        <AboutCard heading="Small and Crafty">
          <Text lineHeight="7" maxW="container.md" mx="auto" style={{ textAlignLast: 'center' }} textAlign="justify">
            Gameigo is a video game discovery platform where you can keep all your games in one unified profile and
            create your exclusive collection. The application is powered by a public API provided by RAWG which houses
            more than 350,000 games across half a hundred platforms.
          </Text>
        </AboutCard>
        <AboutCard heading="Creator">
          <Text lineHeight="7" maxW="container.md" mx="auto" style={{ textAlignLast: 'center' }} textAlign="justify">
            Hi there, I&apos;m Abhishek - aka Abe 👋 I am a self learner trying to get hands on new technologies and
            producing exciting products that are as smart, as they are effective. Wanna talk about Computer Sciency
            things? Drop a message : )
          </Text>
        </AboutCard>
        <AboutCard heading="Contact">
          <Stack isInline spacing="2" justifyContent="center">
            <NextLink href="https://github.com/AbePlays" legacyBehavior passHref>
              <Link
                bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
                color={isDarkMode ? 'dark-text' : 'light-text'}
                px="4"
                py="2"
                rounded="md"
                target="_blank"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
              >
                Github
              </Link>
            </NextLink>
            <NextLink href="mailto:abhi.rawat456@gmail.com" legacyBehavior passHref>
              <Link
                bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
                color={isDarkMode ? 'dark-text' : 'light-text'}
                px="4"
                py="2"
                rounded="md"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
              >
                Mail
              </Link>
            </NextLink>
            <NextLink href="https://www.linkedin.com/in/abe10/" legacyBehavior passHref>
              <Link
                bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
                color={isDarkMode ? 'dark-text' : 'light-text'}
                px="4"
                py="2"
                rounded="md"
                target="_blank"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
              >
                LinkedIn
              </Link>
            </NextLink>
          </Stack>
        </AboutCard>
      </MotionStack>
    </Page>
  );
};

export default About;
