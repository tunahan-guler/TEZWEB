import React from 'react';
import { HTMLFieldProps, connectField } from 'uniforms';

// export type ImageFieldProps = HTMLFieldProps<string, HTMLDivElement>;

function Example({ onChange, value }) {
  return (
    <div className="ImageField"> 
      <TextField id="filled-basic" label="Filled" variant="filled" value = {value} onChange={onChange} />
    </div>
  );
}

export default connectField(Example);