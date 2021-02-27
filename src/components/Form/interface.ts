import { ChangeEvent } from "react";

export interface AlertType {
  message: string;
  severity?: 'success' | 'error' | 'info'
}

export const FIELD = "field";
export const MESSAGE = "message";

export interface ErrorMessagesType {
  [FIELD]?: string;
  [MESSAGE]: string;
}
export interface FormType {
    className: string;
    fields: ConfigField[];
    groups?: string[];
    submitButtonName?: string;
    onSubmit: (values: object[]) => void;
    response: string | ErrorMessagesType[];
    clearOnSubmit?: boolean;
    showClearButton?: boolean;
}

export interface OptionsType {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface FieldType {
    placeholder?: string;
    style?: object;
    value: string;
    id?: string;
    // only if dropdown or radio type
    options?: OptionsType[];
    // min and max are only for text and number fields
    min?: number;
    max?: number;
    className?: string;
    required?: boolean;
    name: string;
    label?: string;
    error?: boolean;
    helperText?: string;
    type?: 'text' | 'number' | 'password' | 'date' | 'checkbox' | 'radio';
    disabled?: boolean;
    descriptionText?: string;
    miscData?: any;
    // Render custom Component
    Component?: any
}

export interface ConfigField extends FieldType{
    inputType: 'date' | 'radio' | 'check-box' | 'json' | 'date-and-time' | 'text' | 'bigText' | 'dropdown' | 'other' | 'slider',
    groupName?: string;
}

export interface DateFieldType extends FieldType{
  onChange: (event: string) => void;
  onBlur: (event: ChangeEvent<any>) => void;
}
