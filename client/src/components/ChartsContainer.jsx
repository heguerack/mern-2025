import { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { BarChartComponent } from './BarChart'
import { AreaChartComponent } from './AreaChart'

export function ChartsContainer({ data }) {
  const [barChart, setBarChart] = useState(true)

  return (
    <Wrapper>
      <h4 className='' typeof='button'>
        Monthly Apllications
      </h4>
      <button className='' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Switch to Area Chart' : 'Switch to Bart Chart'}
      </button>

      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} margin={{ top: 50 }} />
      )}
    </Wrapper>
  )
}
