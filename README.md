# forms

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/forms.svg)](https://www.npmjs.com/package/forms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @taranjeetsingh/form
```

## Usage

```tsx
import React, { Component } from 'react'

import {Form} from '@taranjeetsingh/form'

const App = () => {

  function onFormSubmit(data: any) {
    console.log('data', data);
}

  return <div style={{padding: '0 20px'}}>
    <Form
      showClearButton
      fields={[
        {
          name: 'name',
          inputType: 'text',
          placeholder: 'write text here',
          value: '',
          className: '',
          type: 'text',
          required: true,
          id: 'name',
          max: 20,
          min: 3,
        },
        {
          name: 'number',
          label: 'number',
          inputType: 'text',
          value: '',
          className: '',
          type: 'number',
          id: 'number',
          min: 18,
          max: 90
        },
        {
          name: 'gender',
          label: 'gender selection',
          inputType: 'check-box',
          placeholder: 'gender',
          value: '',
          options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}],
          className: '',
          type: 'text',
          required: true,
          id: 'gender'
        },
        {
          name: 'classes',
          label: 'classes',
          inputType: 'dropdown',
          options: [{label: 'first', value: 'first'}, {label: 'second', value: 'second'}],
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
          options: [{label: 'first', value: 'first'}, {label: 'secibd', value: 'second'}, {label: 'third', value: 'third'}],
          placeholder: 'section',
          value: '',
          className: '',
          type: 'text',
          required: true,
          id: 'section'
        },
        {
          name: 'section slider',
          label: 'section-taranjeet',
          inputType: 'slider',
          options: [{label: 'first', value: '40'}, {label: 'secibd', value: '50'}, {label: 'third', value: '70'}],
          placeholder: 'section',
          value: '',
          className: '',
          required: true,
          id: 'slider-section'
        },
        {
          name: 'big-text',
          label: 'big-text',
          inputType: 'bigText',
          placeholder: 'big-text',
          value: '',
          className: '',
          required: true,
          id: 'big-text'
        },
        {
          name: 'date-field',
          label: 'date-field',
          inputType: 'date-and-time',
          placeholder: 'date',
          value: '',
          className: '',
          type: 'text',
          required: true,
          id: 'date-field'
        },

      ]}
      className={''}
      onSubmit={onFormSubmit}
      response={''}
    />
  </div>
}
```

## License

MIT © [Taranjeet Singh](https://github.com/taranjeetsingh0)
