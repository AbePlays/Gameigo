import { FunctionComponent } from 'react';
import { Center } from '@chakra-ui/react';

const Loader: FunctionComponent = () => {
  return (
    <Center mx="4" py="16">
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </div>
    </Center>
  );
};

export default Loader;
