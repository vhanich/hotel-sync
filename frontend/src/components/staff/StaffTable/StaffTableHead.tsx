import { 
    TableHead, 
    TableRow,
    TableCell
 } from '@mui/material';


export const StaffTableHead = () => {
    return(
        <TableHead>
            <TableRow>
                <TableCell>Staff ID</TableCell>
                <TableCell>Member</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};