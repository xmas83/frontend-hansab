const Car = ({id, make, model, numberplate}) => {
  return <tr>
    <td>{id}</td>
    <td>{make}</td>
    <td>{model}</td>
    <td>{numberplate}</td>
  </tr>
}
export default Car;
