import{Route,BrowserRouter,Routes} from "react-router-dom"
// import Header from "./Header"
import Homepage from "./Homepage"
import Studentpage from "./Studentpage"
import About from "./About";


import Subject from "./Subject";
import Mark from "./Mark";




function Router(){
    return(
        <div>
        <BrowserRouter>
        <Routes>
            {/* <Route path="*" Component={Header}/> */}
            <Route path="/" Component={Homepage}/>
            <Route path="/student" Component={Studentpage}/>
            <Route path="/about" Component={About}/>
            
            <Route path="/mark" Component={Mark}/>
            <Route path="/subject" Component={Subject}/>
            
            </Routes></BrowserRouter>
            </div>
    )
}

export default Router;