'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextFieldInput, TextFieldRoot, TextFieldSlot } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Input() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const query = new FormData(e.currentTarget).get('query') as string;
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <TextFieldRoot size="3">
        <TextFieldSlot>
          <MagnifyingGlassIcon color="gray" height={20} width={20} />
        </TextFieldSlot>
        <TextFieldInput
          defaultValue={searchParams.get('query')?.toString()}
          name="query"
          placeholder="Search Games"
          type="search"
        />
      </TextFieldRoot>
    </form>
  );
}

export { Input };
