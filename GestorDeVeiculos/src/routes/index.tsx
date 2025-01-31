import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Dashboard } from "../pages/Dashboard"


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/dashboard' element={<Dashboard />}></Route>

                {/* <Route path='*' element={<Error />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter