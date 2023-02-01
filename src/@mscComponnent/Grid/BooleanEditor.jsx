import { Input } from '@mui/material'
import React from 'react'

const TextEditor = ({ row, onRowChange, onClose, column }) => {
    return (
        <Input
            fullWidth
            autoFocus
            value={row[column.key] ? row[column.key] : ''}
            onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
            onBlur={(e) => onClose(true)}
        />
    )
}

export default TextEditor