import { Flex, Skeleton } from '@radix-ui/themes';

interface Props {
  count?: number;
}

export default function LoadingCard({ count = 1 }: Props) {
  // const { colorMode } = useColorMode();
  const colorMode: string = 'light';
  const isDarkMode = colorMode === 'dark';

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              aria-hidden="true"
              className={`${
                isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'
              } overflow-hidden rounded-lg shadow-lg`}
              data-testid="loading-card"
              key={index}
            >
              <Skeleton className="h-56" />
              <div className="p-4 space-y-4">
                <Skeleton className="h-8" />
                <Flex gap="4">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </Flex>
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </div>
            </div>
          );
        })}
    </>
  );
}
