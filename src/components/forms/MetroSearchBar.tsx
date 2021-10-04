import React from 'react'
import styled from 'styled-components'
import './Form.css'

interface MetroSearchBarProps {
  setStopNumber: React.Dispatch<React.SetStateAction<string>>
  stopNumber: string
  getTableData: (val:string) => void
}

export const MetroSearchBar = ({
  setStopNumber,
  stopNumber,
  getTableData
}: MetroSearchBarProps) => {
  //simple styled component that only is responsible for the rendering of the searchBar and firing off searches based off stopId
  return (
    <SearchContainer>
      <StyledSearch className="metro-query-container"
        value={stopNumber}
        type="number"
        placeholder="Enter stop number"
        onChange={(e) => setStopNumber(e.target.value)} />
      <SearchButton onClick={() => {
        getTableData(stopNumber)
        setStopNumber('')
      }}>
        <img alt="search button" src="https://www.metrotransit.org/img/svg/search-gray.svg" />
      </SearchButton>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
margin-top: 20px;
background-color: #fff;
border: 1px solid #e3e3e0;
display: flex;
flexDirection: row; 
width: 100%;
height: 50px; 
alignItems: center;
`
const StyledSearch = styled.input`
margin: 0;
padding: 0 .75rem;
width: 90%;
border: 1px  transparent;
cursor: text;
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