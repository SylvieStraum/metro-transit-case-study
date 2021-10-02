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
      className={className}
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
  background-color: #fff;
  border: 1px solid #e3e3e0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  vertical-align: middle;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 1.125rem!important;
  padding: .75em;
  font-weight: 400;
  line-height: 1.5;
  color: #626462;
  transition: background-color .5s ease-in-out,border-color .5s ease-in-out,box-shadow .5s ease-in-out, opacity .5s, transform .5s;
`
const MetroOption = styled.option`
font-weight: normal;
display: block;
white-space: nowrap;
min-height: 1.2em;
padding: 0px 2px 1px;
`