import { Box, Heading } from '@radix-ui/themes'
import Image from 'next/image'

import notFound from 'public/images/notfound.svg'

function NoData({ children }: { children?: React.ReactNode }) {
  return (
    <Box>
      <Image alt="" className="mx-auto" width="350" src={notFound} />
      <Heading align="center" mt="4">
        No Data Found!
      </Heading>
      {children}
    </Box>
  )
}

export { NoData }
