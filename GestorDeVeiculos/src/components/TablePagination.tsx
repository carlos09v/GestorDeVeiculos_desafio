import { TablePaginationProps } from "../@types/web"


const Pagination = ({ totalVehicles, vehiclesPerPage, setCurrentPage, currentPage }: TablePaginationProps) => {
  /* https://www.youtube.com/watch?v=wAGIOCqS8tk&ab_channel=CodeBlessYou */
  let pages: number[] = []

  for (let i = 1; i <= Math.ceil(totalVehicles / vehiclesPerPage); i++) {
    pages.push(i)
  }

  // Pegamos apenas as primeiras 10 páginas
  const visiblePages = pages.slice(0, 10);

  return (
    <div className="flex gap-2">
      {visiblePages.map((page, i) => (
        <button className="border-2 border-black p-2 bg-purple-500 hover:bg-purple-700 rounded-md text-white transition-colors" key={i} id={page === currentPage ? 'active' : ''} onClick={() => setCurrentPage(page)}>{page}</button>
      ))}

      {pages.length > 10 && (
        <div>
          <p className="border-2 border-black p-2 bg-gray-500 rounded-md text-white">...</p>
        </div>
      )}

      {totalVehicles > vehiclesPerPage && (
        <p className="border-2 border-black p-2 bg-blue-500 rounded-md text-white">Total: {totalVehicles}</p>
      )}
    </div>
  )
}

export default Pagination