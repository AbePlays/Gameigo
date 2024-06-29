import { Card, Flex, Grid, Inset, Skeleton } from '@radix-ui/themes'

interface Props {
  count?: number
}

export default function LoadingCard({ count = 1 }: Props) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => {
          return (
            <Card className="h-full shadow-lg rounded-lg group" key={index}>
              <Inset side="top">
                <Skeleton height="14rem" />
              </Inset>
              <Grid gap="4" p="4">
                <Skeleton height="2rem" />
                <Flex gap="4">
                  <Skeleton height="2rem" width="5rem" />
                  <Skeleton height="2rem" width="5rem" />
                </Flex>
                <Skeleton height="1.5rem" />
                <Skeleton height="1.5rem" />
              </Grid>
            </Card>
          )
        })}
    </>
  )
}
