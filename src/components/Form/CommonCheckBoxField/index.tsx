import React, { ChangeEvent } from "react";
import {FormLabel, Grid} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FieldType, OptionsType } from "../interface";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import {DescriptionText} from "../DescriptionText";

interface CheckBoxTypeProps extends FieldType{
    onChange: (event: ChangeEvent<any>) => void;
    onBlur: (event: ChangeEvent<any>) => void;
    label: string;
}

const styles = {
  formControlCheckBox: {
    margin: '10px 0'
  }
}

export const CommonCheckBoxField = (props: CheckBoxTypeProps) => {

    const {id, className, label,
        onBlur, helperText, options, style,
        onChange, value='', descriptionText=''
    } = props;

    function onChangeCheckBox(e: ChangeEvent<any>, checkValue: string) {

        if(e.target.checked) {
          e.target.value = value ? `${value},${checkValue}` : `${checkValue}`;
          console.log('added value', e.target.value);
        }
        else {
          const valueArr = value.split(',').filter((v: string) => v !== checkValue);

          e.target.value = valueArr.join(',');
        }
        onChange(e);
    }

    function renderCheckBox(option: OptionsType, index: number) {

      const {label, disabled} = option;
      const checkBoxValue = option.value;

      function isChecked() {
        const nv = value.split(',');
        return nv.includes(checkBoxValue);

      }

      return (
        <FormControl
          key={index}
          component="fieldset"
          disabled={disabled}
          style={styles.formControlCheckBox}
          className={`form-control-checkbox`}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup onBlur={onBlur}>
            <FormControlLabel
              control={<Checkbox color="primary" checked={isChecked()} value={isChecked()}
              onChange={e => onChangeCheckBox(e, checkBoxValue)}
              name={label} />}
              label={label}
            />
          </FormGroup>
        </FormControl>
      );
    }

    return (
        <Grid style={style} className={`${className} tsf-check-box-container`} id={id ? id : undefined}>

          <FormLabel component="legend">{label}</FormLabel>

          {
            options && options.length
              ? options.map(renderCheckBox)
              : null

          }

          <FormHelperText error={true}>{helperText}</FormHelperText>
          <DescriptionText description={descriptionText} />

        </Grid>
    );
}
