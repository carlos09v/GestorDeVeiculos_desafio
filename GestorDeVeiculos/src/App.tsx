import { ToastContainer } from "react-toastify"
import { VehicleProvider } from "./Context/VehicleContext"
import AppRouter from "./routes"
import BackgroundSlider from "./components/BackgroundSlider"



function App() {


  return (
    <VehicleProvider>
      <div className="z-[5]">
        <BackgroundSlider />
      </div>
      <AppRouter />
      <ToastContainer autoClose={1500} theme="colored" />
    </VehicleProvider>
  )
}

export default App
