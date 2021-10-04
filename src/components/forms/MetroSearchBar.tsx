import React from 'react'
import styled, { css } from 'styled-components'
import './Form.css'

interface MetroSearchBarProps {
  setStopNumber: React.Dispatch<React.SetStateAction<string>>
  stopNumber: string
  getTableData: (val:string) => void
  error?:{error:Error, stopId:number}
}

export const MetroSearchBar = ({
  setStopNumber,
  stopNumber,
  getTableData,
  error
}: MetroSearchBarProps) => {
  //simple styled component that only is responsible for the rendering of the searchBar and firing off searches based off stopId
  return (<>
    <SearchContainer
    className={error?.error ? 'error' : ''}>
      <StyledSearch 
        value={stopNumber}
        id="searchBar"
        type="number"
        placeholder="Enter stop number"
        onChange={(e) => setStopNumber(e.target.value)} />
      <SearchButton onClick={() => {
      stopNumber && getTableData(stopNumber)
        setStopNumber('')
      }}>
        <img alt="search button" src="https://www.metrotransit.org/img/svg/search-gray.svg" />
      </SearchButton>
    </SearchContainer>
      {error?.error && <label className="error-text" htmlFor="stopId">stop #{error.stopId} doesn't exist</label>}
    </>
  )
}

const SearchContainer = styled.div`
margin-top: 20px;
background-color: #fff;
border: 1px solid #e3e3e0;
display: flex;
flexDirection: row; 
alignItems: center;
vertical-align: middle;
width: 100%;
height: 50px;

  ${props =>props.className ==='error' && css `
    border: 1px solid #D8000C;
    color: #D8000C;
    background-color: #FFBABA ;
  `}
`
const StyledSearch = styled.input`
margin: 0;
padding: 0 .75rem;
width: 90%;
border: 1px  transparent;
cursor: text;
font-size: 1.125rem !important;
font-weight: 400;
line-height: 1.5;
color: #626462;
`

const SearchButton = styled.button`
background-color:transparent;
width: 10%;
height: 100%;
padding:0;
margin:0;
border: 1px  transparent;
cursor: pointer;
`