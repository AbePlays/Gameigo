import { Button } from '@radix-ui/themes'

import { IconGithub, IconGoogle } from '@/icons'
import { SOCIALAUTHPROVIDERS } from './constant'

function SocialAuthProviders() {
  return SOCIALAUTHPROVIDERS.map((provider) => {
    let Icon: React.ReactNode
    switch (provider.providerId) {
      case 'google':
        Icon = <IconGoogle />
        break
      case 'github':
        Icon = <IconGithub />
        break
      default:
        throw new Error(`Invalid provider`)
    }

    return (
      <Button
        color="gray"
        name="provider"
        key={provider.id}
        size="3"
        value={provider.providerId}
        variant="outline"
        type="submit"
      >
        {Icon} {provider.title}
      </Button>
    )
  })
}

export { SocialAuthProviders }
