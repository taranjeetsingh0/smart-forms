import React, {ChangeEvent} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from '@material-ui/core/styles';
import {FieldType, OptionsType} from "../interface";
import {DescriptionText} from "../DescriptionText";

const useStyles = makeStyles({
  appDropDown: {
    minWidth: '194.4px'
  },
  appDropDownFormControl: {
  width: '100%'
  }
});

interface DropDownType extends FieldType{
    options: OptionsType[];
    index: number;
    onChange: (event: ChangeEvent<any>) => void;
    onBlur: (event: ChangeEvent<any>) => void;
}
export const DropDown = (props: DropDownType) => {

    const {options, id, className, name, onChange, onBlur, label,
        error=false, helperText, disabled=false, descriptionText = '',
        placeholder='', required=false, value, index} = props;
    const randomId = `${name.split(' ').join('-')}-${index}-drop-down-input-label`;

    const classes = useStyles();

    return (
        <Grid key={index} className={`${className} ${classes.appDropDown}`} id={id ? id : ''}>
            <FormControl className={classes.appDropDownFormControl} error={error} disabled={disabled}>
                <InputLabel id={randomId}>{label}</InputLabel>
                <Select
                    className={'app-drop-down-select'}
                    name={name}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    labelId={randomId}
                    value={value}
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
