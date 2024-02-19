import { useState } from "react";

const Checkbox = ({ index, count, title }) => {


  const [checkedState, setCheckedState] = useState(
    new Array({count}).fill(false)
  );
  
  const [array, setArray] = useState([]);


  const handleOnChange = (position) => {

   const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        console.log(position)
        return !item;
      } else {
        return item;
      }

    });

    setCheckedState(updatedCheckedState);
  }



  const generateArray = (count) => {
    const newArray = Array.from({ length: count }, (_, index) => {
      return { id: index, value: `Element ${index}` };
    });
    setArray(newArray);
  };


  console.table(checkedState[0])
  return (
    <>
      <label className="container">
        <input
          type="checkbox"
          id={`${index}`}
          name=''
          value=''
          checked={checkedState[index]}
          onChange={() => handleOnChange(index)}
        />
        <span className="checkmark"></span>
      </label>
      <p>{title}</p>

    </>

  );
}

export default Checkbox;