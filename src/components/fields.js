
export const TextField = ({ label, value, onChange }) => {
  return(
    <label>
      {label}
      <input type='text' value={value} onChange={onChange}/>
    </label>
  );
}

export const SelectField = ({ label, value, onChange, options }) => (
  <label>
    {label}
    <select value={value} onChange={onChange}>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </label>
);