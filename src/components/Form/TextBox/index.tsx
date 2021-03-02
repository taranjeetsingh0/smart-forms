import React, {ChangeEvent} from "react";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {FieldType} from "../interface";
import {DescriptionText} from "../DescriptionText";

interface TextBoxType extends FieldType{
    multiline?: boolean;
    onChange: (event: ChangeEvent<any>) => void;
    onBlur: (event: ChangeEvent<any>) => void;
    variant?: "standard" | "filled" | "outlined" | undefined;
}

const styles = {
    textBoxFormControl: {
      marginBottom: '10px',
      width: '100%'
    }
  }

export const TextBox = (props: TextBoxType) => {
    const {id, className, label, required=false, style, name,
        onBlur, helperText, type, disabled=false, descriptionText='', variant,
        onChange, error=false, value='', placeholder='', multiline=false} = props;
    
    return (
        <Grid className={`${className} tsf-text-container`} style={style}>
            <FormControl style={styles.textBoxFormControl}>
            
                <TextField
                    placeholder={placeholder}
                    value={value}
                    variant={variant}
                    disabled={disabled}
                    error={error}
                    type={type}
                    name={name}
                    helperText={helperText}
                    onBlur={onBlur}
                    multiline={multiline}
                    onChange={onChange}
                    required={required}
                    id={id ? id : undefined}
                    label={label}
                />
                <DescriptionText description={descriptionText} />
            </FormControl>
        </Grid>
    );
};
