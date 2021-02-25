import React from 'react'
import './assets/style/index.scss'
import { Form } from './components/Form'
import { FormType } from './components/Form/interface'

export const SmartForm = (props: FormType) => <Form {...props} />
