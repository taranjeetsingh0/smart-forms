import React, {ChangeEvent, useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {FieldType} from "./interface";

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { DateTime } from 'luxon';

interface DateFieldType extends FieldType{
    onChange: (event: string) => void;
    onBlur: (event: ChangeEvent<any>) => void;

}

export const DateField = (props: DateFieldType) => {
    const {id, className, label, type,
        disabled=false,
        onChange, value=''} = props;

    const [finalValue, setFinalValue] = useState<string>('');

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date(),
    );

    function updateFinalValue() {
        if(selectedDate) {
            try {
                const timeStamp = DateTime.fromISO(selectedDate.toISOString());
                const value = timeStamp.toString();
                onChange(value);
                setFinalValue(value);
            }
            catch (e) {
                setFinalValue('');
            }
        }
    }

    useEffect(() => {
        if(selectedDate) {
            updateFinalValue();
        }
    }, [selectedDate]);

    useEffect(() => {
        if(value) {
            const timeStamp = DateTime.fromISO(value);
            const hour = timeStamp.toFormat('hh:mm:a');
            setSelectedDate(new Date(`${timeStamp.toISODate()} ${hour}`));
        }
        else {
            setSelectedDate(null);
            setTimeout(() => {
                setSelectedDate(new Date());
            });
        }
    }, []);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <Grid id={id ? id : ''} className={`date-field ${className ? className : ''}`}>

            <h3>{label}: {finalValue}</h3>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around" direction={"column"}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        disabled={disabled}
                    />
                    <KeyboardTimePicker
                        disabled={disabled}
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        style={{display: `${type === 'date' ? 'none' : 'block' }`}}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

        </Grid>
    );
}