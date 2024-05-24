import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

function Modal(props) {
    const { t } = useTranslation();
    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth='md'>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>{t('Cancel')}</Button>
                <Button onClick={props.onSave}>{t('Save')}</Button>
            </DialogActions>
        </Dialog>
    );
};
export default Modal;
