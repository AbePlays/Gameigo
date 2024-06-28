'use client';

import { Button, Flex, IconButton, Spinner, Strong, Text, TextField } from '@radix-ui/themes';
import { useFormState, useFormStatus } from 'react-dom';

import { changeName } from './actions';
import { INITIAL_CHANGE_NAME_STATE } from './constant';

function ChangeName() {
  const [state, formAction] = useFormState(changeName, INITIAL_CHANGE_NAME_STATE);

  return (
    <form className="mt-4" action={formAction}>
      <Strong>
        <label htmlFor="name">Display Name</label>
      </Strong>
      <Flex gap="4" mt="2">
        <TextField.Root className="w-full" id="name" name="name" size="3" type="text" />
        <Submit />
      </Flex>
      {state.errors.name && (
        <Text color="red" size="2">
          {state.errors.name}
        </Text>
      )}
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <IconButton size="3">
        <Spinner />
      </IconButton>
    );
  }
  return (
    <Button size="3" type="submit">
      Save
    </Button>
  );
}

export { ChangeName };
