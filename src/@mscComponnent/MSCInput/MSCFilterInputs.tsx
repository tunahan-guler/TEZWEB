import { Divider, Grid, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { connectField } from 'uniforms'
import { AutoField } from 'uniforms-material'
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type Props = {
    disabled: boolean,
    itemProps: any,
    label: string,
    value?: any,
    type?: string,
    onChange?: () => void,
    filterTypeValue: string,
    onFilterTypeChange?: () => void,
    options: Array<any>,
}

export default function MSCFilterInputs({ label, itemProps, value,  filterTypeValue, onFilterTypeChange, disabled = false, onChange, type = 'text',}: Props) {
    const { t } = useTranslation();
    const optionsForFilterType = [
        { label: t('equal'), value: "equal" },
        { label: t('contains'), value: "contains" },
    ]

    return (
        <>
            <Grid container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                style={{ padding: '2px' }}
            >
                <Grid item xs={4} sm={4} lg={4} md={4}>
                    <Typography mt={2}>
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} lg={2} md={2}>
                    <Select
                        label={null}
                        fullWidth
                        size="small"
                        onChange={onFilterTypeChange}
                        value={filterTypeValue}
                        defaultValue={'equal'}
                        style={{ fontSize: 10, color: 'black' }}
                    >
                        {optionsForFilterType.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={6} sm={6} lg={6} md={6}>
                   <TextField type={type} fullWidth label={null} size="small" value={value} disabled={disabled} {...itemProps} onChange={onChange}
                        style={disabled ? { backgroundColor: '#E8E8E8' } : null} />
                </Grid>
            </Grid>
        </>
    )
}

