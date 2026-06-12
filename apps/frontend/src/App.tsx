import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from '../pages/Home'
import { Signin } from '../pages/Signin'
import { Signup } from '../pages/Signup'
import {Marketplace} from "../pages/Marketplace"
import {Apidetials} from "../pages/ApiDetails"
import {Success} from "../pages/Success"
import {Error} from "../pages/Error"
import {Publish} from "../pages/Publish"
import {ManageApi} from "../pages/ManageApi"
import {UsageLog} from "../pages/UsageLog"



function App() {


  return (
    <Router >
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apidetails/:apiName" element={<Apidetials/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/publish" element={<Publish/>}/>
        <Route path ="/manageApi" element ={<ManageApi/>}/>
        <Route path ="/manageApi" element ={<ManageApi/>}/>
        <Route path ="/usageLog/:apiId" element ={<UsageLog/>}/>



      </Routes>
    </Router>
  )
}

export default App
