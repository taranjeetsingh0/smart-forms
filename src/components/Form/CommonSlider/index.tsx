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
    key: number;
}

export const CommonSlider = (props: CommonSliderType) => {
  const classes = useStyles();

  const {error, label, value, name, options=[], onBlur, helperText, descriptionText='', onChange, key} = props;
  const id = props.id ? props.id : `${name}-${key}`;

  const marks = options && options.map(option => {
      return {label: option.label, value: Number(option.value)}
  });

  function onSliderChange(e: any, r: any) {
      e.target.value = r;
      onChange(e);
  }

  return (
    <Grid className={classes.root}>
      <FormLabel component="legend">{label}</FormLabel>
        <Slider
            onChange={onSliderChange}
            onBlur={onBlur}
            defaultValue={Number(value)}
            aria-labelledby={id}
            valueLabelDisplay="auto"
            marks={marks && marks.length ? marks : []}
        />
        {error && helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        <DescriptionText description={descriptionText} />
      <DescriptionText description={descriptionText} />
    </Grid>
  );
}
