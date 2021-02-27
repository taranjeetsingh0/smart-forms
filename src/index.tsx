import React from 'react'
import { Form as SmartForm } from './components/Form'
import { FormType } from './components/Form/interface'

export const Form = (props: FormType) => <SmartForm {...props} />
export * from './components/Form/DropDown';
export * from './components/Form/CommonRadioField';
export * from './components/Form/CommonCheckBoxField';
export * from './components/Form/CommonSlider';
export * from './components/Form/DescriptionText';
export * from './components/Form/TextBox';
export * from './components/Form/JsonEditor';
export * from './components/Alert';
export * from './components/VerticalTab'
