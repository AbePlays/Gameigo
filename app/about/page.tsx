import { Container, Flex, Link, Text } from '@radix-ui/themes';
import { type Metadata } from 'next';

import { AboutCard } from 'app/about/about-card';

export const metadata: Metadata = {
  title: 'About | Gameigo',
  description:
    'Gameigo is a video game discovery platform where you can keep all your games in one unified profile and create your exclusive collection. The application is powered by a public API provided by RAWG which houses more than 350,000 games across half a hundred platforms.',
};

export default function About() {
  return (
    <Container size="2">
      <div className="grid gap-12">
        <AboutCard heading="Small and Crafty">
          <Text as="p" className="!leading-relaxed text-justify" style={{ textAlignLast: 'center' }}>
            Gameigo is a video game discovery platform where you can keep all your games in one unified profile and
            create your exclusive collection. The application is powered by a public API provided by RAWG which houses
            more than 350,000 games across half a hundred platforms.
          </Text>
        </AboutCard>

        <AboutCard heading="Creator">
          <Text as="p" className="!leading-relaxed text-justify" style={{ textAlignLast: 'center' }}>
            Hi there, I&apos;m Abhishek - aka Abe 👋 I am a self learner trying to get hands on new technologies and
            producing exciting products that are as smart, as they are effective. Wanna talk about Computer Sciency
            things? Drop a message : )
          </Text>
        </AboutCard>

        <AboutCard heading="Contact">
          <Flex gap="2" justify="center">
            <Link href="https://github.com/AbePlays">Github</Link>
            <Link href="mailto:abhi.rawat456@gmail.com">Mail</Link>
            <Link href="https://www.linkedin.com/in/abe10">LinkedIn</Link>
          </Flex>
        </AboutCard>
      </div>
    </Container>
  );
}
