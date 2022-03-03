import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import Car from "./car.component";
import SearchIcon from "../icons/search.icon";
import {sortBy} from "lodash";

const Cars = () => {
  const [getCars, setCars] = useState([]);
  const [getFilteredCars, setFilteredCars] = useState([]);
  const [getSearchString, setSearchString] = useState('');
  const [getSortValue, setSortValue] = useState('');
  const [getTotalPages, setTotalPages] = useState(null);
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getPaginatedCars, setPaginatedCars] = useState([]);

  const itemPerPage = 10;

  const onSearch = (event) => {
    setSearchString(event.target.value);
  }

  const onSort = (event) => {
    setSortValue(event.target.value)
  }

  const onNextPage = () => {
    if (getCurrentPage < getTotalPages) {
      setCurrentPage(getCurrentPage + 1)
    }
  }
  const onPrevPage = () => {
    if (getCurrentPage > 1) {
      setCurrentPage(getCurrentPage - 1)
    }
  }
  const onPageChange = (val) => {
    setCurrentPage(val)
  }

  useEffect(() => {
    fetch('http://localhost:8080/cars')
      .then((response) => response.json())
      .then((users) => {
        setCars(users);
        const pages = Math.ceil(users.length / itemPerPage);
        setTotalPages(pages);
        setPaginatedCars(users.filter((user, index) => index < itemPerPage));
      });
  }, []);

  useEffect(() => {
    setFilteredCars(getCars.filter((car) => car.make.toLowerCase().includes(getSearchString.toLowerCase())))
  }, [getSearchString]);

  useEffect(() => {
    switch (+getSortValue) {
      case 1:
        setCars(sortBy(getCars, ['id'], ['asc']));
        break;
      case 2:
        setCars(sortBy(getCars, ['make'], ['asc']));
        break;
      case 3:
        setCars(sortBy(getCars, ['model'], ['asc']));
        break;
      case 4:
        setCars(sortBy(getCars, ['numberplate'], ['asc']));
        break;

      default:
        break;
    }
  }, [getSortValue]);

  useEffect(() => {
    setPaginatedCars(getCars.filter((user, index) => index < ((itemPerPage * getCurrentPage)) && index >= (itemPerPage * (getCurrentPage - 1))));
  }, [getCurrentPage, getCars]);

  if (!getCars) {
    return <h1>loading...</h1>
  }


  return <div>
    <div className="container mt-5 mb-5">
      <div className="shadow border rounded-3" style={{borderColor: '#dbdbdb'}}>
        <div className="text-info px-3 pt-2">
          <h4>Cars</h4>
        </div>
        <div className="px-3">
          <div className="row align-items-center justify-content-between mb-3 mt-3">
            <div className="col-6">
              <div className="position-relative">
                <SearchIcon className="position-absolute stroke-" style={{
                  stroke: "gray",
                  width: '20px',
                  height: 'auto',
                  top: "50%",
                  left: '10px',
                  transform: "translateY(-50%)"
                }}/>
                <input className="form-control fs-6" type="search" placeholder="Search user by make"
                       aria-label="Search user by make" style={{paddingLeft: '35px'}} onChange={onSearch}/>
              </div>
            </div>
            <div className="col-6">
              <div className="d-inline-flex float-end gap-3">
                <div className="align-self-center">
                  <select className="form-select" aria-label="users sort by" onChange={onSort}>
                    <option value="1">Sort By Id</option>
                    <option value="2">Sort By Make</option>
                    <option value="3">Sort By Model</option>
                    <option value="4">Sort By Numberplate</option>
                  </select>
                </div>
                <div className="">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination m-0">
                      <li className="page-item">
                        <div role="button" className="page-link border-info text-info cursor-pointer"
                             aria-label="Previous" onClick={onPrevPage}>
                          <span aria-hidden="true">&laquo;</span>
                        </div>
                      </li>
                      {[...Array(getTotalPages)].map((value, index) => (
                        <li key={index + 1} className="page-item">
                          <div role="button"
                               className={`page-link border-info ${getCurrentPage === (index + 1) ? 'bg-info text-white' : 'text-info'}`}
                               onClick={onPageChange.bind(this, (index + 1))} value={index + 1}>{index + 1}</div>
                        </li>
                      ))}
                      <li className="page-item">
                        <div role="button" className="page-link border-info text-info cursor-pointer" aria-label="Next"
                             onClick={onNextPage}>
                          <span aria-hidden="true">&raquo;</span>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table responsive="sm" striped={true} hover={true} className="table-info m-0 table-custom">
          <thead>
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Numberplate</th>
          </tr>
          </thead>
          <tbody className="" style={{borderTop: "2px solid #17d6ff"}}>
          {getSearchString.length <= 0 && getPaginatedCars.map((car) => (
            <Car key={car.id} {...car} />
          ))}
          {getSearchString.length > 0 && getFilteredCars.map((car) => (
            <Car key={car.id} {...car} />
          ))}
          </tbody>
        </Table>
      </div>
    </div>
  </div>
}
export default Cars;
