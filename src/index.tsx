import React from 'react'
import { Form as SmartForm } from './components/Form'
import { FormType } from './components/Form/interface'

export const Form = (props: FormType) => <SmartForm {...props} />
