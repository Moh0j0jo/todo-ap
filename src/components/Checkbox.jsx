
const Checkbox = ({ index, title, checked, onChange }) => {
  
  const handleChange = (event) => {
    const newCheckedState = event.target.checked;
    onChange(newCheckedState);
  };

  return (
    <>
      <label className="container">
      <input
        type="checkbox"
        id={`${index}`}
        name=""
        value=""
        checked={checked}
        onChange={handleChange} // Use onChange prop
      />
        <span className="checkmark"></span>
      </label>
      <p className={checked ? "item-title checked" : "item-title"}>{title}</p>
    </>
  );
};

export default Checkbox;
