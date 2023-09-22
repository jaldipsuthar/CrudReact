import React from 'react'
import { Pagination, Stack } from '@mui/material'
import { IPaginationComponent } from '../../models/pagination.model';

function PaginationComponent({currentPage ,totalPages ,setCurrentPage }:IPaginationComponent | any) {
    
    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
      };
  return (
    <div
    style={{ display: "flex", justifyContent: "center" }}
    className="pagination_container"
  >
    <Stack spacing={2} sx={{ justifyContent: "center" }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
      />
    </Stack>
  </div>
  )
}

export default PaginationComponent
