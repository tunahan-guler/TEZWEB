import { Button, Icon } from '@material-ui/core';
import React from 'react'
import { useTranslation } from 'react-i18next';

const MSCButton = ({ onClick, title, disabled }) => {
    const { t } = useTranslation();
    return (
        <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={disabled}
            onClick={onClick}
            startIcon={<Icon className="hidden sm:flex">{title === "View" ? "visibility" :
                title === "Accept" ? 'check' : title?.toLowerCase()}</Icon>}
        >
            <span className="hidden sm:flex">{t(title)}</span>
            <span className="flex sm:hidden">{t(title)}</span>
        </Button>
    )
}

export default MSCButton