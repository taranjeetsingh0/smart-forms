import React from 'react';
import {Button} from "@material-ui/core";

interface ButtonType {
    title: string;
    onClick: (data: any) => void;
    color?: 'primary' | 'secondary',
    variant?: "contained" | "text" | "outlined" | undefined;
    className?: string;
}

export const CommonButton = (props: ButtonType) => {

    const {className, color='primary', variant='contained', onClick, title} = props;

    return (
        <Button
            className={`${className ? className : ''} common-button-container`}
            onClick={onClick}
            variant={variant}
            color={color}>
            {title}
        </Button>
    );
}