import { describe, expect, it } from 'vitest';

import SearchResult from '@components/SearchResult';
import { render, screen, waitFor } from '../../test-utils';

// TODO:- Improve this test

describe('Testing SearchResult Component', () => {
  it('should check loader presence', async () => {
    render(<SearchResult page={1} query="God of War" />);

    expect(screen.getAllByTestId('loading-card').length).toBeGreaterThan(0);
    await waitFor(() => expect(screen.queryAllByTestId('loading-card').length).toBe(0));
  });
});
