import LoadingSvg from '../assets/LoadingIO/Spinner-1s-200px-blue.svg'


const Loading = () => {

  return (
    <img src={LoadingSvg} className="mx-auto pointer-events-none" alt="Loading" />
  )
}

export default Loading