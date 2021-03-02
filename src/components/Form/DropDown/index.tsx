import React, {ChangeEvent} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import {FieldType, OptionsType} from "../interface";
import {DescriptionText} from "../DescriptionText";

const styles = {
    appDropDown: {
      minWidth: '194.4px'
    },
    appDropDownFormControl: {
    width: '100%'
    }
  };

interface DropDownType extends FieldType{
    options: OptionsType[];
    index: number;
    onChange: (event: ChangeEvent<any>) => void;
    onBlur: (event: ChangeEvent<any>) => void;
    variant?: "standard" | "filled" | "outlined" | undefined;

}
export const DropDown = (props: DropDownType) => {

    const {options, id, className, name, onChange, onBlur, label, style,
        error=false, helperText, disabled=false, descriptionText = '',
        variant,
        placeholder='', required=false, value, index} = props;
    const randomId = `${name.split(' ').join('-')}-${index}-drop-down-input-label`;

    const inLineStyle = {
        ...styles.appDropDown,
        ...style
    }

    return (
        <Grid key={index} className={`${className} tsf-dropdown-container`} id={id ? id : ''} style={inLineStyle}>
            <FormControl variant={variant} style={styles.appDropDownFormControl} className={`drop-down-form-container`} error={error} disabled={disabled}>
                <InputLabel id={randomId}>{label}</InputLabel>
                <Select
                    className={'app-drop-down-select'}
                    name={name}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    labelId={randomId}
                    value={value}
                    label={label}
                    required={required}
                    onChange={onChange}
                >
                    <MenuItem className={'app-drop-down-menu-item'} value="">
                        None
                    </MenuItem>
                    {
                        options &&
                        options.map((option, index) => <MenuItem
                            key={index}
                            className={'app-drop-down-menu-item'}
                            value={option.value}>{option.label}</MenuItem>)
                    }
                </Select>
                {error && helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <DescriptionText description={descriptionText} />
            </FormControl>
        </Grid>
    );
};
