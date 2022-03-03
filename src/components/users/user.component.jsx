import {useState} from "react";
import {Modal, Button, Table} from "react-bootstrap";


const User = ({id, name, cars}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{cars.length}</td>
      <td><span role="button" className="text-info text-decoration-underline" onClick={handleShow}>Details</span></td>
    </tr>
    <Modal show={show} onHide={handleClose} style={{backgroundColor: 'rgba(243, 253, 255, 0)'}}>
      <Modal.Header closeButton style={{backgroundColor: 'rgb(229, 251, 255)'}}>
        <Modal.Title>{name.charAt(0).toUpperCase() + name.slice(1)}'s Cars</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor: 'rgb(229, 251, 255)'}}>
        <Table responsive="sm" striped={true} hover={true} className="table-info m-0 border table-custom"
               style={{borderColor: 'gray'}}>
          <thead>
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Numberplate</th>
          </tr>
          </thead>
          <tbody className="" style={{borderTop: "2px solid #17d6ff"}}>
          {cars.map((car) => {
            return <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.numberplate}</td>
            </tr>
          })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer style={{backgroundColor: 'rgb(229, 251, 255)'}}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}
export default User;
