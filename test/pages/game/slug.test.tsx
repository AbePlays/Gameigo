import { describe, expect, it, vi } from 'vitest';

import GameDetailContainer from '../../../app/game/[slug]/page';
import { mockGameInfo } from '../../mockData';
import { render, screen } from '../../test-utils';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    beforePopState: vi.fn(),
  })),
}));

describe('Testing Game Details Page', () => {
  it('should check game title', () => {
    render(<GameDetailContainer params={{}} />);

    expect(screen.getByText(mockGameInfo.name)).toBeInTheDocument();
  });
});
