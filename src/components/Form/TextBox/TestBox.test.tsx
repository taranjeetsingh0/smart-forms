import React, { ChangeEvent } from 'react';
import {render} from '@testing-library/react';
import {TextBox} from './index';

const setup = () => {

    const value = 'text box value';

    function onChange(event: ChangeEvent<any>) {
        console.log('value', event.target.value);
    }

    const utils = render(
        <TextBox
            value={value}
            name='text-box-name'
            placeholder='type text here'
            onChange={onChange}
            onBlur={onChange}
        />
    )
    const input = utils.getByPlaceholderText('type text here');
    return {
        input,
        ...utils
    }
}

describe('TextBox component', () => {
    test('Should allow textbox to have correct value', () => {
        const {input} = setup();
        expect(input.value).toBe('text box value');
    });
});
