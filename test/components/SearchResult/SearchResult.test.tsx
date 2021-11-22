import SearchResult from '@components/SearchResult';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';

// TODO:- Improve this test

describe('Testing SearchResult Component', () => {
  it('should check loader presence', async () => {
    render(
      <SearchResult
        onNext={null}
        onPrevious={null}
        page={1}
        query="God of war"
      />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));
  });
});
