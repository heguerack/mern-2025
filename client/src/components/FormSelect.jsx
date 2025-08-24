export default function FormSelect({ valuesObject, label, name }) {
  const valuesArray = Object.values(valuesObject)
  return (
    <div className='form-row'>
      <label className='form-label'>{label ? label : name}</label>
      <select
        name={name}
        id={name}
        className='form-input'
        defaultValue={valuesArray[0]}>
        {valuesArray.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
