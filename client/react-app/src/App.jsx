import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dummy from './Dummy'
  // import DBToFrontend from './component/DBToFrontend'
import LandingPage from './component/LandingPage'
import Form from './component/Form'
import UpdateForm from './component/UpadteForm'
import DeleteItem from './component/DeleteItem'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<LandingPage />} ></Route>
       {/* <Route path='users' element={<DBToFrontend/>}></Route>  */}
      <Route path='/create' element={<Form/>} ></Route>
       <Route path='update/:id' element={<UpdateForm/>} ></Route>
       <Route path='/delete' element={<DeleteItem/>}></Route>
    </Routes>
    
    </BrowserRouter>

      
        {/* <Dumy/> */}
        {/* <Form/> */}
        {/* <LandingPage/> */}
        
         {/* <DBToFrontend/> */}
      

    </>
  )
}

export default App
