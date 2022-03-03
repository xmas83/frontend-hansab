import {Routes, Route} from "react-router-dom";
import {lazy, Suspense} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header.component";
import Loader from "./components/loader/loader.component";
import './App.css';


const UsersPage = lazy(() => import("./pages/userspage/users.page"));
const CarsPage = lazy(() => import("./components/cars/cars.component"));

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>}/>
          <Route path="/users" element={<UsersPage/>}/>
          <Route path="/cars" element={<CarsPage/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
