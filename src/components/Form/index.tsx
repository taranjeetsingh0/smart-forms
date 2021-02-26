import React, {ChangeEvent, useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {TextBox} from "./TextBox";
import {DropDown} from "./DropDown";
import {
  AlertType,
  ConfigField, ErrorMessagesType, FIELD,
  FormType, MESSAGE
} from "./interface";

import {Alert} from "../Toast";
import {CommonRadioField} from "./CommonRadioField";
import {CommonCheckBoxField} from "./CommonCheckBoxField";
import {CommonButton} from "../CommonButton";
import {DateField} from "./DateField";
import {VerticalTab, VerticalTabPanel} from "../VerticalTab";
import { checkUniqueOptions } from "../../utils/tools";
import { CommonSlider } from "./CommonSlider";

interface FormState {
    label: string;
    value: string;
    isTouched: boolean;
    helperText: string;
}

const SET_VALUE_ACTION = 'SET_VALUE_ACTION';
const SET_IS_TOUCHED_ACTION = 'SET_IS_TOUCHED_ACTION';

function IsJsonString(str: string) {
  try {
    JSON.parse(str);
  }
  catch (e) {
    return false;
  }
  return true;
}

const useStyles = makeStyles({
  form: {
    margin: '20px 0',
    paddingBottom: '10px',
    borderBottom: '2px dashed #3f51b5'
  },
  formFieldContainerWrapper: {
  borderLeft: '2px solid #3f51b5',
  paddingLeft: '10px',
  paddingBottom: '10px',
  marginBottom: '20px'
},
  redBorder: {
  borderColor: '#f44336 !important'
}
});

export const Form = (props: FormType) => {

    const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
    const [alert, setAlertMessage] = React.useState<AlertType>({message: ''});
    const [tabValue, setTabValue] = React.useState<number>(0);
    const [filteredGroups, setFilteredGroups] = useState<string[]>([]);

    const [formState, setFormState] = useState<FormState[]>([]);
    const {className, groups, fields, onSubmit, submitButtonName, response='', clearOnSubmit=false, showClearButton=false} = props;

    function setErrorMessage(name: string) {
        return `${name} is required`;
    }

    function changeValue(event: any, label: string, action: string) {
        const value = event.target.value;
        let state: FormState[];

        function setHelperText(fieldItem: ConfigField, formStateItem: FormState, value: string) {

            const {max, inputType, min, required, type} = fieldItem;
            const {label} = formStateItem;

            if(max !== undefined || min!== undefined) {
                if(max !== undefined && max) {
                    if((inputType === 'bigText' || inputType === 'text') && type === 'text') {
                        if(value.length > max && !(!required && (!value || value.length === 0))) {
                            return `${label} should have maximum ${max} characters`;
                        }
                    }
                    else if(inputType === 'text' && type === 'number') {
                        if(Number(value) > Number(max) && !(!required && !value)) {
                            return `${label} should be maximum ${max}`;
                        }
                    }
                }
                if(min !== undefined && min) {
                    if((inputType === 'bigText' || inputType === 'text') && type === 'text') {
                        if(value.length < min && !(!required && (!value || value.length === 0))) {
                            return `${label} should have minimum ${min} characters`;
                        }
                    }
                    else if(inputType === 'text' && type === 'number') {
                        if(Number(value) < Number(min) && !(!required && !value)) {
                            return `${label} should be minimum ${min}`;
                        }
                    }
                }
            }
            if(inputType === 'json') {
                if(!IsJsonString(value)) {
                    return `${label} is not a valid JSON`;
                }
            }

            return (!value && fieldItem.required) ? setErrorMessage(formStateItem.label) : ''
        }

        const fieldItem = fields.find(ranjodh => {
          if(ranjodh.label === label) return ranjodh;
          else if(ranjodh.name === label) return ranjodh;
          return undefined;
        });
        if(fieldItem) {
            if (action === SET_VALUE_ACTION) {
                state = formState.map((item) => {
                    if (item.label === label) {
                        return {
                            ...item,
                            value,
                            helperText: setHelperText(fieldItem, item, value)
                        }
                    }
                    return item;
                });
                setFormState(state);
            }
            if (action === SET_IS_TOUCHED_ACTION) {
                state = formState.map((item) => {
                    if (item.label === label) {
                        return {
                            ...item,
                            helperText: setHelperText(fieldItem, item, item.value),
                            isTouched: true
                        }
                    }
                    return item;
                });
                setFormState(state);
            }
        }
    }

    useEffect(() => {

        const state = fields.map(field => {

            return {
                label: field.label || field.name,
                [`value`]: field.value,
                [`isTouched`]: !!field.helperText,
                [`helperText`]: field.helperText || ''
            };
        });
        setFormState(state);
    }, [fields]);

    useEffect(() => {

        if (typeof response === 'string') {
            if(clearOnSubmit) {
                clearForm();
            }
        }
        else if(response && response.length) {
            setFormErrors(response);
            if (response.length === 1 && !response[0][FIELD] && response[0][MESSAGE]) {
                showAlert({message: response[0][MESSAGE], severity: "error"});
            }
            else {
                let errorMessage = '';
                response.forEach((item, index) => {
                    errorMessage += `${index+1}. ${item.message}. `;
                })
                showAlert({message: errorMessage, severity: "error"});
            }
    }
    }, [response, clearOnSubmit]);

    /*Filter groups which have at least one child element*/
    useEffect(() => {
        if(groups && groups.length) {
            const h = groups.filter(group => {
                return fields.find(field => field.groupName === group);
            });
            setFilteredGroups(h);
        }
    }, [groups, fields]);

    function getValue(label: string) {
        const value = formState.find(item => item.label === label);
        if (value) {
            return value.value;
        }
        return '';
    }

    function hasError(label: string) {
        const value = formState.find(item => item.label === label);
        if (value) {
            return !!(value.helperText)
        }
        return false;
    }

    function getHelperText(label: string) {
        const value = formState.find(item => item.label === label);
        if (value) {
            return value.helperText
        }
        return '';
    }

    function showAlert(alertParam: AlertType) {
        setIsAlertOpen(true);
        setAlertMessage({
            message: alertParam.message,
            severity: alertParam.severity
        });
    }

    function renderFields(field: ConfigField, index: number, groupId?: string) {
        const {
          inputType,
          options,
          groupName='', id,
          className, name,
          placeholder='',
          required, type='text', disabled=false, descriptionText=''
        } = field;

        const label = field.label || name;

        /*If group Id: Field is not grouped*/
        if(groupId && groupName !== groupId) {
            return null;
        }
        else if(!groupId && groupName) {
            return null;
        }

        function onChange(e: ChangeEvent<any>) {
            changeValue(e, label, SET_VALUE_ACTION)
        }

        function onBlur(e: ChangeEvent<any>) {
            changeValue(e, label, SET_IS_TOUCHED_ACTION)
        }

        const helperText = getHelperText(label);
        const value = getValue(label);
        const error = hasError(label);
        const classNames = `${className} ${classes.formFieldContainerWrapper} ${error ? classes.redBorder : ''}`;


        if(inputType === 'date') {
            return (
                <DateField
                    descriptionText={descriptionText}
                    key={index}
                    name={name}
                    disabled={disabled}
                    error={error}
                    required={required}
                    placeholder={placeholder}
                    helperText={helperText}
                    onChange={(value: any) => {changeValue({target: {value}}, label, SET_VALUE_ACTION)}}
                    onBlur={onBlur}
                    label={label}
                    id={id}
                    value={value}
                    className={classNames}
                />
            );
        }
        if(inputType === 'date-and-time') {

            return (
                <DateField
                    descriptionText={descriptionText}
                    key={index}
                    name={name}
                    disabled={disabled}
                    error={error}
                    required={required}
                    placeholder={placeholder}
                    helperText={helperText}
                    onChange={(value: any) => {changeValue({target: {value}}, label, SET_VALUE_ACTION)}}
                    onBlur={onBlur}
                    label={label}
                    id={id}
                    value={value}
                    className={classNames}
                />
            );
        }
        if (inputType === 'text') {
            return (
                <TextBox
                    descriptionText={descriptionText}
                    type={type}
                    key={index}
                    name={name}
                    disabled={disabled}
                    error={error}
                    required={required}
                    placeholder={placeholder}
                    helperText={helperText}
                    onChange={onChange}
                    onBlur={onBlur}
                    label={label}
                    id={id}
                    value={value}
                    className={classNames}
                />
            );
        }
        if(inputType === 'dropdown') {
            return (
                <DropDown
                    descriptionText={descriptionText}
                    disabled={disabled}
                    onBlur={onBlur}
                    value={value}
                    options={options && options.length ? options : []}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    index={index}
                    name={name}
                    label={label}
                    error={error}
                    helperText={helperText}
                    key={index}
                    className={classNames}
                />
            );
        }
        if(inputType === 'bigText') {
            return (
                <TextBox
                    descriptionText={descriptionText}
                    disabled={disabled}
                    type={type}
                    key={index}
                    name={name}
                    error={error}
                    multiline={true}
                    required={required}
                    placeholder={placeholder}
                    helperText={helperText}
                    onBlur={onBlur}
                    onChange={onChange}
                    label={label}
                    value={value}
                    id={id}
                    className={classNames}
                />
            );
        }
        if(inputType === 'radio') {
            return (
                <CommonRadioField
                    descriptionText={descriptionText}
                    disabled={disabled}
                    required={required}
                    name={name}
                    key={index}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label={label}
                    id={id}
                    className={classNames}
                    options={options}
                    helperText={helperText}
                />
            );
        }
        if(inputType === 'check-box') {
          if(!options || !Array.isArray(options)) {
              throw Error(`Options of inputType ${inputType} should be an array of alteast one object of label and value`)
          }
          if(options && !checkUniqueOptions(options)) {
            throw Error(`Options of inputType ${inputType} should have unique values`);
          }
            return (
                <CommonCheckBoxField
                    descriptionText={descriptionText}
                    disabled={disabled}
                    required={required}
                    name={name}
                    key={index}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label={label}
                    id={id}
                    options={options}
                    className={classNames}
                    helperText={helperText}
                />
            );
        }

        if(inputType === 'slider') {
            return (
                <CommonSlider
                    descriptionText={descriptionText}
                    disabled={disabled}
                    required={required}
                    name={name}
                    key={index}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label={label}
                    id={id}
                    options={options}
                    className={classNames}
                    helperText={helperText}
                /> 
            );
        }
        return null;
    }

    async function onClickSubmit() {
        let isValid = true;

        function setIsTouched() {
            let newFormState: FormState[] = [];
            formState.forEach(item => {
                const formItem = fields.find(field => field.label === item.label);
                if (formItem && formItem.required && !item.value) {
                    isValid = false;
                    newFormState.push({
                        ...item,
                        isTouched: true,
                        helperText: setErrorMessage(item.label)
                    });
                }
                else {
                    newFormState.push(item);
                }
            });
            setFormState(newFormState);
        }
        setIsTouched();

        if(isValid) {
            const values: {name: string; value: string}[] = [];
            formState.forEach(item => {
                const exist = fields.find(field => field.label === item.label);
                if(exist) {
                    values.push({
                        name: exist.name,
                        value: item.value
                    });
                }
            });
            await onSubmit(values);
            if(clearOnSubmit) {
                clearForm();
            }
        }
    }

    function setFormErrors(errors?: ErrorMessagesType[]) {
        const values: FormState[] = [];
        formState.forEach(item => {
            if (errors && errors.length) {
                const field = fields.find(fieldItem => fieldItem.label === item.label);
                if(field) {
                    const error = errors.find(errorItem => errorItem[FIELD] === field.name);
                    if (error) {
                        values.push({
                            ...item,
                            helperText: error[MESSAGE],
                            isTouched: true
                        });
                    }
                    else {
                        values.push({
                            ...item
                        });
                    }
                }
            }
        });
        setFormState(values);
    }

    function clearForm() {
        const values: FormState[] = [];
        formState.forEach(item => {
            values.push({
                ...item,
                value: '',
                helperText: '',
                isTouched: false
            });
        });
        setFormState(values);
    }

    const classes = useStyles();
    console.log('Form state', formState);

    return (
        <Grid className={`${className} ${classes.form}`} container justify={'center'} direction={'column'}>
            {fields.map((option: ConfigField, index) => {
                return renderFields(option, index);
            })}

            {/*Render Group Fields*/}
            {
                filteredGroups && filteredGroups.length
                    ? <VerticalTab value={tabValue} setValue={setTabValue} tabs={filteredGroups}>
                        {
                            filteredGroups && filteredGroups.length
                                ? filteredGroups.map((groupName, index) => {
                                    const exist = fields.filter(ranjod => ranjod.groupName === groupName);
                                    if(exist && exist.length) {
                                        return (
                                            <VerticalTabPanel value={tabValue} index={index}>
                                                {exist.map((option: ConfigField) => {
                                                    if(option.groupName === groupName) {
                                                        return (
                                                            <div>
                                                                {renderFields(option, index, groupName)}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </VerticalTabPanel>
                                        );
                                    }
                                    return  null;
                                })
                                : null
                        }
                      </VerticalTab>
                : null
            }

            <Grid container spacing={1} justify={"flex-end"}>
                {
                    showClearButton
                    ? <Grid item><CommonButton title={'Clear values'} onClick={clearForm} color={'secondary'} /></Grid>
                    : null
                }
                <Grid item>
                    <CommonButton
                        onClick={onClickSubmit}
                        title={submitButtonName ? submitButtonName : 'Submit'}
                        color={"primary"}
                    />
                </Grid>
            </Grid>
            <Alert
                isAlertOpen={isAlertOpen}
                onAlertClose={setIsAlertOpen}
                severity={alert.severity}
                message={alert.message}
            />
        </Grid>
    );
};
