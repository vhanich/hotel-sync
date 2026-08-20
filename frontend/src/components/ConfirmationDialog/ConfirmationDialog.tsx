import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export const ConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
}: ConfirmationDialogProps) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>
                    Confirm employee update
                </DialogTitle>

                <DialogContent>
                    Are you sure you want to update this employee?
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}