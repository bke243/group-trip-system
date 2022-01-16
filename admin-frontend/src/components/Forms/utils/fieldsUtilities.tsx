export enum FORM_NAME {
  CREATE_PACKAGE,
  LOGIN,
  PACKAGE_EDIT
}

export interface FormFieldProps {
  label: string;
  name: string;
  id?: string;
  error?: boolean;
  disabled?: boolean;
  Component: any;
  helperText?: string;
  formName?: FORM_NAME;
  errorMessage?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

export const getFieldErrorByName = (errors: { [x: string]: any }, fieldName: string) => {
  return errors ? (errors[fieldName]?.message as string) : undefined;
};

export const DATE_FORMAT = "YYYY-MM-DD";
