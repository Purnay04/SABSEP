import { FieldTextbox, IsFieldTextbox } from './form';

const checkIfFieldTextbox = <T extends FieldTextbox>(
  obj: T
): IsFieldTextbox<T> => {
  return ('address' in obj) as IsFieldTextbox<T>;
};
