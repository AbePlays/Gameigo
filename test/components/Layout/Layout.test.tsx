import Layout from '@components/Layout';
import { mockText } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing Layout Component', () => {
  it('should check whether children are rendered', () => {
    render(
      <Layout>
        <span>{mockText}</span>
      </Layout>
    );
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});
