import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { FormHelperText, FormLabel, Grid } from '@material-ui/core';
import { FieldType } from '../interface';
import { DescriptionText } from '../DescriptionText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

interface CommonSliderType extends FieldType {
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (event: ChangeEvent<any>) => void;
}

export const CommonSlider = (props: CommonSliderType) => {
  const classes = useStyles();

  const {error, miscData, label, value, disabled, name, options=[], onBlur, helperText, descriptionText='', onChange, className} = props;
  // set default step to 10
  let step = 10;
  if(!(miscData && miscData.step)) step = 10;

  const id = props.id ? props.id : `${name}-${descriptionText}`;

  const marks = options && options.map(option => {
      return {label: option.label, value: Number(option.value)}
  });

  function onSliderChange(e: any, r: any) {
      e.target.value = r;
      onChange(e);
  }

  console.log('helper text', helperText);

  return (
    <Grid className={`${className}`} key={id}>
      <Grid className={`${classes.root}`} id={id}>
      <FormLabel component="legend">{label}</FormLabel>
        <Slider
            onChangeCommitted={onSliderChange}
            onBlur={onBlur}
            disabled={disabled}
            value={Number(value)}
            step={step}
            aria-labelledby={id}
            valueLabelDisplay="auto"
            marks={marks && marks.length ? marks : []}
        />
        {error && helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        <DescriptionText description={descriptionText} />
      <DescriptionText description={descriptionText} />
    </Grid>
    </Grid>
    
  );
}
