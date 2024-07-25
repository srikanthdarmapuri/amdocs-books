import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function BooksPagination({ currentPage, total, onPageChange }) {
    const [page, setPage] = React.useState(currentPage - 1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage);
    };

    return (
        <Pagination count={total} defaultPage={page+1} siblingCount={2} boundaryCount={1}  onChange={handleChangePage}/>
    );
}
