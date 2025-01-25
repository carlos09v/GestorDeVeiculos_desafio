import { TablePaginationProps } from "../@types/web"


const Pagination = ({ totalCars, carsPerPage, setCurrentPage, currentPage }: TablePaginationProps) => {
    /* https://www.youtube.com/watch?v=wAGIOCqS8tk&ab_channel=CodeBlessYou */
    let pages: number[] = []

    for(let i = 1; i <= Math.ceil(totalCars/carsPerPage); i++) {
        pages.push(i)
    }
  return (
    <div>
        {pages.map((page, i) => (
            <button className="paginationButtons p-2 bg-purple-500 rounded-lg text-white" key={i} id={page === currentPage ? 'active' : ''} onClick={() => setCurrentPage(page)}>{page}</button>
        ))}
    </div>
  )
}

export default Pagination