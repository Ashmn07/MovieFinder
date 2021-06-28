import React from 'react'
import Pagination from 'react-js-pagination'

function Paging({pageChangeHandler,page,result}) {
    return (
        <div className="flex justify-center">
        <Pagination
            onChange={pageChangeHandler}
            activePage={page}
            itemsCountPerPage={20}
            totalItemsCount={result}
            innerClass={'flex mb-16 sm:mb-0 text-red-600 space-x-3 md:p-6 md:space-x-7 cursor-pointer font-semibold'}
            activeClass={'text-bgGray bg-red-600 px-1 md:px-2 pb-1 font-bold'}
            disabledClass={'text-gray-700'}
        />
        {/* <ReactPaginate
        nextLabel={">"}
        previousLabel={"<"}
        pageCount={pageLimit}
        onPageChange={pageChangeHandler}
        containerClassName={'flex mb-16 sm:mb-0 text-red-600 p-3 space-x-2 md:p-6 md:space-x-7 cursor-pointer font-semibold'}
        previousLinkClassName={'font-bold'}
        nextLinkClassName={'font-bold'}
        disabledClassName={'text-gray-800'}
        activeClassName={'text-bgGray bg-red-600 px-1 md:px-2 pb-1 font-bold'}
        currentPage={page}
        /> */}

        </div>
    )
}

export default Paging
