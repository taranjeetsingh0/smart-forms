import React from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  form_description_text: {
    color: '#3f51b5'
  }
})

export const DescriptionText = (props: {description: string}) => {

    const classes = useStyles();
    return (
        <Grid className={classes.form_description_text}>
            <p>{props.description}</p>
        </Grid>
    );
}
