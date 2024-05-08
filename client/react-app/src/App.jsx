import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Forms from './component/Form' // Import the Forms component here
import UpdateForm from './component/UpadteForm'
import DeleteItem from './component/DeleteItem'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} ></Route>
          <Route path='/create' element={<Forms />} ></Route> {/* Render the Forms component for the create route */}
          <Route path='update/:id' element={<UpdateForm />} ></Route>
          <Route path='/delete' element={<DeleteItem />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
