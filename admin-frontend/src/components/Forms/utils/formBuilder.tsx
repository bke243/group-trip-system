import { cloneDeep } from "lodash";
import ActivityField from "../controlledField/ActivityField";
import DateField from "../formFields/DateField";
import FreeTextField, { FreeNumberField } from "../formFields/FreeTextField";
import TextAreaField from "../formFields/TextAreaField";
import FormFieldContainer from "../views/FormFieldContainer.view";
import { FormFieldProps, FORM_NAME } from "./fieldsUtilities";

export const UserRegisterFeildsName: string[] = ["firstName", "lastName", "birthDate", "email", "passWord", "confirmPassword"];

const fields: FormFieldProps[] = [
  {
    name: "name",
    label: "Package name",
    Component: FreeTextField,
  },
  {
    name: "description",
    label: "Description",
    Component: TextAreaField,
  },
  {
    name: "price",
    label: "Price",
    Component: FreeNumberField,
    type: "number",
  },
  {
    name: "email",
    label: "Email",
    Component: FreeTextField,
    type: "email",
  },
  {
    name: "startDate",
    label: "Start Date",
    Component: DateField,
  },
  {
    name: "endDate",
    label: "End Date",
    Component: DateField,
  },
  {
    name: "count",
    label: "Available number",
    Component: FreeNumberField,
    type: "number",
    
  },
  {
    name: "passWord",
    label: "Password",
    Component: FreeTextField,
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    Component: FreeTextField,
    type: "password",
  },
  
  {
    name: "maxPersons",
    label: "Maximun Persons",
    Component: FreeNumberField,
    type: "number",
  },
  {
    name: "country",
    label: "Country",
    Component: FreeTextField,
  },
  {
    name: "city",
    label: "City",
    Component: FreeTextField,
  },
  {
    name: "streetName",
    label: "Street",
    Component: FreeTextField,
  },
  {
    name: "zipCode",
    label: "ZipCode",
    Component: FreeTextField,
  },
  {
    name: "state",
    label: "State",
    Component: FreeTextField,
  },
  {
    name: "activities",
    label: "Activities",
    Component: ActivityField
  },
  {
    name: "id",
    label: "Package id",
    Component: FreeTextField,
    type: "number",
  }
];

class FormBuilder {
  private formFields: FormFieldProps[] = [];

  constructor(fieldsName: string[], formName: FORM_NAME) {
    const formFields = fields.filter((formField) => fieldsName.includes(formField.name)).map((formField) => ({ ...cloneDeep(formField), formName }));
    this.formFields = fieldsName.map((fieldName) => formFields.find((formField) => formField.name === fieldName) as FormFieldProps);
  }

  buildFormFields() {
    const fields = this.formFields.map((formField) => <FormFieldContainer key={formField.name} {...formField} />);
    return fields;
  }

  buildeFormFieldsWithName() {
    const fields = this.formFields.map((formField) => ({
      component: <FormFieldContainer key={formField.name} {...formField} />,
      fieldName: formField.name,
      label: formField.label,
    }));
    return fields;
  }

  disableFormFields(fieldsName: string[]) {
    this.formFields = this.formFields.map((formField) => {
      if (fieldsName.includes(formField.name)) return { ...formField, disabled: true };
      return formField;
    });
  }
}

export default FormBuilder;
