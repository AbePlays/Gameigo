'use client';

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { Share1Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

function Share() {
  const [_, copy] = useCopyToClipboard();

  return (
    <IconButton aria-label="Share" onClick={() => copy(window.location.href)} title="Share" variant="surface">
      <Share1Icon />
    </IconButton>
  );
}

export { Share };
