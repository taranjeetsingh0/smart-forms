import React from "react";
import {Grid} from "@material-ui/core";

const styles = {
  form_description_text: {
    color: '#3f51b5'
  }
}

export const DescriptionText = (props: {description: string}) => {

    return (
        <Grid className={`form-description-text`} style={styles.form_description_text}>
            <p>{props.description}</p>
        </Grid>
    );
}
