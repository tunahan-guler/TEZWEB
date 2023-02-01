import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTranslation } from 'react-i18next'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = ({ onYesButtonClick, handleClose, showModal }) => {
    const { t } = useTranslation();
    return (
        <div>
            <Dialog
                open={showModal}
                TransitionComponent={Transition}
                BackdropProps={{
                    style: {
                        opacity: 0.4
                    }
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t('AreYouSureYouWantToDelete')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t('AreYouSureYouWantToDelete')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color={'info'} variant={'contained'} onClick={() => { onYesButtonClick(); handleClose() }}>{t('Yes')}</Button>
                    <Button color={'info'} variant={'contained'} onClick={handleClose}>{t('No')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmModal