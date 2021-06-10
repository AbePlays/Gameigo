import { Text } from '@chakra-ui/layout';

import Layout from '@/components/Layout';
import { render, screen } from '../../test-utils';

describe('Testing Layout Component', () => {
  it('should check whether children are rendered', () => {
    render(
      <Layout>
        <Text>Hello world</Text>
      </Layout>
    );
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
