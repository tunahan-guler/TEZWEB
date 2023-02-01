import { MenuItem } from '@material-ui/core'
import { FormControl, Grid, InputLabel, Select, Typography } from '@mui/material'
import React from 'react'

type Props = {
  options:Array<any>,
  label:string,
  onChange?:() => void,
  value?:any,
  onClick?:() => void,
}

const MSCLookup = ({ options, label, onChange, value, onClick }: Props) => {
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
        <Grid item xs={8} sm={8} lg={8} md={8}>
          <Select
            label={null}
            fullWidth
            size="small"
            onChange={onChange}
            onClick={onClick}
            value={value}
            style={{ fontSize: 10, color: 'black', marginTop:10}}
          >
            {options.map((item,index) => (
              <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </>
  )
}

export default MSCLookup