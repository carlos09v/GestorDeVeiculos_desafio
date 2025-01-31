import { TablePaginationProps } from "../@types/web"


const Pagination = ({ totalCars, carsPerPage, setCurrentPage, currentPage }: TablePaginationProps) => {
    /* https://www.youtube.com/watch?v=wAGIOCqS8tk&ab_channel=CodeBlessYou */
    let pages: number[] = []

    for(let i = 1; i <= Math.ceil(totalCars/carsPerPage); i++) {
        pages.push(i)
    }
  return (
    <div className="flex gap-2">
        {pages.map((page, i) => (
            <button className="p-2 bg-purple-500 hover:bg-purple-700 rounded-md text-white transition-colors" key={i} id={page === currentPage ? 'active' : ''} onClick={() => setCurrentPage(page)}>{page}</button>
        ))}
    </div>
  )
}

export default Pagination