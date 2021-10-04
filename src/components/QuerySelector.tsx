import React from 'react'
import styled, { css } from "styled-components"

interface QuerySelectorProps {
  queryType: 'select' | 'search'
  setQueryType: React.Dispatch<React.SetStateAction<"select" | "search">>
}

export const QuerySelector = ({
  queryType,
  setQueryType
}: QuerySelectorProps) => {

  return (
    <NavContainer>
      <ListNav>
        <LowerPointer onClick={() => setQueryType('select')}
          title={`${queryType === 'select'}`}
        >By route</LowerPointer>
      </ListNav>
      <ListNav>
        <LowerPointer onClick={() => setQueryType('search')}
          title={`${queryType === 'search'}`}
        >By stop #</LowerPointer>
      </ListNav>
    </NavContainer>
  )
}

const LowerPointer = styled.a`
display: list-item;
background-color: #dbf4fd;
color: #047db5;
padding: .75rem 1.75rem;
font-size: 18px!important;
font-weight: 510;
cursor: pointer;
position: relative;

${props => props.title === 'true' && css`
  color: #fff;
  background-color: #0097d0;

  &:after{
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 8px solid #0097d0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    left: 45%;
    bottom:-7px;
  }
`}
`


const ListNav = styled.li`
box-sizing: border-box;
display: list-item;
list-style: none;
word-wrap: break-word;
`
const NavContainer = styled.ul`
display: flex;
justify-self:center;
margin-bottom: 20px;
align-self:center;
padding:.5rem;
`