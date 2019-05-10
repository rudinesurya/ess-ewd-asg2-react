import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Label } from 'semantic-ui-react';

const MyDatePicker = ({
                        input: { value, onChange, ...restInput }, label, placeholder, meta: { touched, error }, ...rest
                      }) => (
  <Form.Field error={touched && !!error}>
    <label>{label}</label>
    <DatePicker
      {...rest}
      placeholderText={placeholder}
      selected={value ? new Date(value) : null}
      onChange={onChange}
      {...restInput}
    />

    {touched && error && <Label basic color="red" content={error} />}
  </Form.Field>
);

export default MyDatePicker;
