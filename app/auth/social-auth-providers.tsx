import { IconGithub, IconGoogle } from '@icons';
import { Button } from '@radix-ui/themes';

import { SOCIALAUTHPROVIDERS } from './constant';

function SocialAuthProviders() {
  return SOCIALAUTHPROVIDERS.map((provider) => {
    let Icon: React.ReactNode;
    switch (provider.providerId) {
      case 'google':
        Icon = <IconGoogle />;
        break;
      case 'github':
        Icon = <IconGithub />;
        break;
      default:
        throw new Error(`Invalid provider`);
    }

    return (
      <Button name="provider" key={provider.id} value={provider.providerId} type="submit">
        {Icon} {provider.title}
      </Button>
    );
  });
}

export { SocialAuthProviders };
