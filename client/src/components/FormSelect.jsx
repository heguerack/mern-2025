export default function FormSelect({
  label,
  name,
  valuesArray,
  onChange,
  defaultValue,
}) {
  return (
    <div className='form-row'>
      <label className='form-label'>{label ? label : name}</label>

      <select
        onChange={onChange}
        name={name}
        id={name}
        className='form-input'
        defaultValue={defaultValue}>
        {
          valuesArray?.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))
          // || console.warn(`FormSelect [${name}] missing valuesArray`)
        }
      </select>
    </div>
  )
}
