import React from 'react'

const GridScrolling = () => {
  return (
    <div style={{overflowX:'auto', whiteSpace:'nowrap', width:'100%'}}>
    <TextField name={'paymentdate'} style={{display:'inline-block', width:'25%'}}/>
    <TextField name={'paymentdate'} style={{display:'inline-block', width:'25%'}}/>
    <TextField name={'paymentdate'} style={{display:'inline-block', width:'25%'}}/>
    <TextField name={'paymentdate'} style={{display:'inline-block', width:'25%'}}/>
    <TextField name={'paymentdate'} style={{display:'inline-block', width:'25%'}}/>
    <TextField name={'paymentdate'} style={{display:'inline-block', width:'25%'}}/>
    {/* <SelectField name={'currency'} options={GetCurrencies()} style={{ width:'50%', display:'inline-block'}}
        label={t('currency')} /> */}
</div>
  )
}

export default GridScrolling