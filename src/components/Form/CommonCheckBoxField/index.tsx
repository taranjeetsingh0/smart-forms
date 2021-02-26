import React, { ChangeEvent } from "react";
import {FormLabel, Grid} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FieldType, OptionsType } from "../interface";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import {makeStyles} from '@material-ui/core/styles';
import {DescriptionText} from "../DescriptionText";

interface CheckBoxTypeProps extends FieldType{
    onChange: (event: ChangeEvent<any>) => void;
    onBlur: (event: ChangeEvent<any>) => void;
    label: string;
}

const useStyles = makeStyles({
  formControlCheckBox: {
  margin: '10px 0'
}
})

export const CommonCheckBoxField = (props: CheckBoxTypeProps) => {

    const {id, className, label,
        onBlur, helperText, options,
        onChange, value='', descriptionText=''
    } = props;

    const classes = useStyles();
    console.log('options', options)

    function onChangeCheckBox(e: ChangeEvent<any>) {
        e.target.value = e.target.checked;
        onChange(e);
    }

    function renderCheckBox(option: OptionsType, index: number) {

      const {label, value, disabled} = option;

      return (
        <FormControl
          key={index}
          component="fieldset"
          disabled={disabled}
          className={classes.formControlCheckBox}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup onBlur={onBlur}>
            <FormControlLabel
              control={<Checkbox checked={value === 'true'} value={!!value} onChange={onChangeCheckBox} name={label} />}
              label={label}
            />
          </FormGroup>
        </FormControl>
      );
    }

    return (
        <Grid className={`${className}`} id={id ? id : undefined}>

          {
            options && options.length
              ? options.map(renderCheckBox)
              : renderCheckBox({label, value}, 0)

          }

          <FormHelperText>{helperText}</FormHelperText>
          <DescriptionText description={descriptionText} />

        </Grid>
    );
}
