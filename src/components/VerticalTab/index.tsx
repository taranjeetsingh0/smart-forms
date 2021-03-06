import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

interface VerticalTabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface VerticalTabProps {
    tabs: string[];
    children: any;
    value: number;
    setValue: any;
}

const styles = {
    root: {
      flexGrow: 1,
      display: 'flex',
      height: '400px'
    },
    tabs: {
      borderRight: `1px solid gray`,
    },
    verticaltabpanel: {
      width: '100%',
      height: '400px',
      overflow: 'auto'
    },
    verticaltabboxcontainer: {
      paddingTop: 0
    }
  };

export function VerticalTabPanel(props: VerticalTabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={`vertical-tab-panel`}
            style={styles.verticaltabpanel}
            {...other}
        >
            {value === index
            && (
                <Box
                    style={styles.verticaltabboxcontainer}
                    className={'vertical-tab-box-container'}
                    p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export const VerticalTab = (props: VerticalTabProps) => {
    
    const {tabs, children, value, setValue} = props;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log('event', event)
        setValue(newValue);
    };

    return (
        <div className={`vertical-tab-container`} style={styles.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={'tabs'}
            >
                {tabs.map((tab, index) => {
                    return <Tab
                        className={value === index ? 'selected' : ''}
                        label={tab}
                        {...a11yProps(index)}
                    />
                })}

            </Tabs>
            {children}
        </div>
    );
}
