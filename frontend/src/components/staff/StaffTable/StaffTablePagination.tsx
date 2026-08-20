import { TableFooter, TablePagination, TableRow } from '@mui/material';

interface StaffTablePaginationProps {
    total: number;
    page: number;
    limit: number;

    onPageChange: React.Dispatch<React.SetStateAction<number>>;
    onLimitChange: React.Dispatch<React.SetStateAction<number>>;
}

export const StaffTablePagination = ({
    total,
    page,
    limit,
    onPageChange,
    onLimitChange

}: StaffTablePaginationProps) => {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    count={total}
                    page={page}
                    rowsPerPage={limit}
                    onPageChange={(_, newPage) => onPageChange(newPage)}
                    onRowsPerPageChange={(event) => onLimitChange(parseInt(event.target.value, 10))}
                />
            </TableRow>
        </TableFooter>
    );
};
