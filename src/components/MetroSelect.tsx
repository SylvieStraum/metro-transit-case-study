import styled from 'styled-components'
import arrows from '../assets/arrows.svg'
import '../App.css'

interface selectProps {
  onChange: (event: any) => void
  defaultText: string
  className?: string
  value: string | number
  data: any[]
}

export const MetroSelect: React.FC<selectProps> = ({
  onChange,
  defaultText,
  className,
  value,
  data,
}) => {
  return (
    <StyledSelect
      className={`${className} metro-query-container`}
      value={value}
      onChange={(event) => onChange(event)}
    >
      <MetroOption>{defaultText}</MetroOption>
      {data.map((item, i) => <MetroOption
        key={i}
        value={item.Value ?? item.Route}
      >{item.Text ?? item.Description}
      </MetroOption>)}
    </StyledSelect>
  )
}

const StyledSelect = styled.select`
  background: url(${arrows})
  no-repeat right .75rem center/8px 10px;
  padding: .75rem;
`
const MetroOption = styled.option`
font-weight: normal;
display: block;
white-space: nowrap;
min-height: 1.2em;
padding: 0px 2px 1px;
`