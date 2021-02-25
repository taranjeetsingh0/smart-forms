import React from 'react'

import { SmartForm } from 'forms'
import 'forms/dist/index.css'

const App = () => {

  function onFormSubmit(data: any) {
    console.log('data', data);
}

  return <SmartForm 
  fields={[
    {
    name: 'name',
    label: 'name',
    inputType: 'text',
    placeholder: 'text',
    value: '',
    className: '',
    type: 'TEXT_FIELD',
    required: true,
    id: 'name',
    max: 20,
    min: 3,
},
    {
        name: 'number',
        label: 'number',
        inputType: 'text',
        placeholder: 'name',
        value: '',
        className: '',
        type: 'number',
        required: true,
        id: 'number',
        min: 18,
        max: 90
    },
    {
        name: 'gender',
        label: 'gender',
        inputType: 'check-box',
        placeholder: 'gender',
        value: '',
        className: '',
        type: 'text',
        required: true,
        id: 'gender'
    },
    {
        name: 'classes',
        label: 'classes',
        inputType: 'dropdown',
        options: [{label: 'first', value: 'first'}, {label: 'secibd', value: 'second'}],
        placeholder: 'classes',
        value: '',
        className: '',
        type: 'text',
        required: true,
        id: 'classes'
    },
    {
        name: 'section',
        label: 'section',
        inputType: 'radio',
        options: [{label: 'first', value: 'first'}, {label: 'secibd', value: 'second'}],
        placeholder: 'section',
        value: '',
        className: '',
        type: 'text',
        required: true,
        id: 'section'
    },
    {
        name: 'big-text',
        label: 'big-text',
        inputType: 'bigText',
        placeholder: 'big-text',
        value: '',
        className: '',
        type: 'text',
        required: true,
        id: 'big-text'
    },

]}
className={''}
onSubmit={onFormSubmit}
response={''}
   />
}

export default App
