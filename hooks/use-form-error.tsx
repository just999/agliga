import { useMemo } from 'react';

type UseFormErrorProps = {
  formState: any;
  fieldName: string;
};

export const useFormError = ({ formState, fieldName }: UseFormErrorProps) => {
  const isInvalid = useMemo(
    () => !!formState.errors[fieldName],
    [formState, fieldName]
  );
  const errorMessage = useMemo(
    () => formState.errors[fieldName]?.join(', '),
    [formState, fieldName]
  );

  return { isInvalid, errorMessage };
};
