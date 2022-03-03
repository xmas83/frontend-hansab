import { Spinner } from "react-bootstrap"

const Loader = () => {
  return <>
    <div className="position-relative" style={{ minWidth: '100vw', minHeight: '100vh' }}>
      <div className="position-fixed" style={{ top: "50%", left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
        <Spinner animation="border" variant="info" />
      </div>
    </div>
  </>
}
export default Loader;
