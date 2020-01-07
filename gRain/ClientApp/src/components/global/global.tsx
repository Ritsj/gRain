import React, { ReactNode, MouseEvent, ChangeEvent } from 'react';

import { 
  FormGroup, 
  Input,
  Button,
  Label,
  InputGroup,
} from 'reactstrap';


/*******
 * Button
 */

export interface ClickButtonProps {
  onClick: ((e: MouseEvent<HTMLButtonElement>) => void),
  label: string,
  name: string
}

export function ClickButton({ onClick, label, name}: ClickButtonProps): JSX.Element {
  return (
  <Button name={name} onClick={onClick}>{label}</Button>
  );
}

/*****
 * Input Selection
 */

export const addOptions = (optionsArray: Array<any>) => {
  return optionsArray.map((item: any, i: number) => <option value={item} key={item} label={item}/> 
  );
}

export const firstCharToUpper = (string: string ) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface InputSelectProps {
  name: string,
  options: Array<string | number>,
  onChange: ((e: ChangeEvent<HTMLInputElement>) => void),
  value: string,
  children?: ReactNode
}

export function InputSelect ({ name, options, onChange, value, children }: InputSelectProps): JSX.Element {
  return (
    <FormGroup>
      <Label for={name}>{firstCharToUpper(name)}</Label>
      <InputGroup>
        <Input type="select" name={name} id={name + 'Select'} onChange={onChange} value={value}>
          {addOptions(options)}
        </Input>
      {children}
      </InputGroup>
    </FormGroup>
  );
}

