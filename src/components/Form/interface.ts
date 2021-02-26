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
}

export interface FieldType {
    placeholder: string;
    value: string;
    id?: string;
    options?: OptionsType[];
    min?: number;
    max?: number;
    className: string;
    required: boolean;
    name: string;
    label: string;
    error?: boolean;
    helperText?: string;
    type?: string;
    disabled?: boolean;
    descriptionText?: string;
    miscData?: any;
}

export interface ConfigField extends FieldType{
    inputType: 'date' | 'radio' | 'check-box' | 'json' | 'date-and-time' | 'text' | 'bigText' | 'dropdown',
    groupName?: string;
}
