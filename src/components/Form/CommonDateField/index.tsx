import React, { ChangeEvent, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

import { DateTime } from "luxon";
import { FieldType } from "../interface";

export interface DateFieldType extends FieldType {
  onChange: (event: string) => void;
  onBlur: (event: ChangeEvent<any>) => void;
}

export const DateField = (props: DateFieldType) => {
  const { id, className, label, onChange, value = "", style } = props;

  const [finalValue, setFinalValue] = useState<string>("");

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  function updateFinalValue() {
    if (selectedDate) {
      try {
        const timeStamp = DateTime.fromISO(selectedDate.toISOString());
        const value = timeStamp.toString();
        onChange(value);
        setFinalValue(value);
      } catch (e) {
        setFinalValue("");
      }
    }
  }

  useEffect(() => {
    if (selectedDate) {
      updateFinalValue();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (value) {
      const timeStamp = DateTime.fromISO(value);
      const hour = timeStamp.toFormat("hh:mm:a");
      setSelectedDate(new Date(`${timeStamp.toISODate()} ${hour}`));
    } else {
      setSelectedDate(null);
      setTimeout(() => {
        setSelectedDate(new Date());
      });
    }
  }, []);

  function onChangeDateText(e: any) {
    const d = new Date(e.target.value);
    setSelectedDate(d);
    setDate(e.target.value);
  }

  function onChangeTimeText(e: any) {
    const fTimeStamp = DateTime.fromISO(e.target.value);
    const hour = fTimeStamp.toFormat("hh:mm:a");
    setTime(e.target.value);
    const timeStamp = DateTime.fromISO(date);
    setSelectedDate(new Date(`${timeStamp.toISODate()} ${hour}`));
  }

  console.log("date and time", date, time, selectedDate);

  return (
    <div
      id={id ? id : ""}
      style={style}
      className={`tsf-date-field-container ${className ? className : ""}`}
    >
      <h3>
        {label}: {finalValue}
      </h3>

      <TextField
        type="date"
        value={date}
        id={`${id}-date-picker`}
        onChange={onChangeDateText}
      />

      <TextField
        type="time"
        value={time}
        placeholder=""
        id={`${id}-time-picker`}
        onChange={onChangeTimeText}
      />
    </div>
  );
};
