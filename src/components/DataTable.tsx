import { useState } from 'react';
import styled from 'styled-components';
import { StopDetailProps, TimePointDepartureProps } from '../types/transitApitTypes';

import '../App.css'

interface TableProps {
  data: TimePointDepartureProps[]
  stopInfo: StopDetailProps
}

export const DataTable = ({ data, stopInfo }: TableProps) => {

  const [isExpanded, setIsExpanded] = useState(false)


  const tableTitles = (
    <TableLabelDiv>
      <h3>
        {stopInfo.StopLabel}
      </h3>
      <p><strong>stop #</strong> {stopInfo.StopID}</p>
    </TableLabelDiv>
  )

 
  const tableBody = (
    !!data.length ? data.map((item: TimePointDepartureProps, index: number) => {
      return (
        <TableRow key={index}>
          <td style={{ width: '20%' }}>
            <strong>{item.Route}</strong>
          </td>
          <td style={{ width: '60%' }}>
            {item.Description}
          </td>
          <td style={{ width: '20%' }}>
            <strong>{item.DepartureText}</strong>
          </td>
        </TableRow>
      )
    })
      :
      <tr>
        <td style={{ width: '40%' }}>
          No departures at this time
        </td>
      </tr>
  )

  const tblFooter= (
   <div style={{ alignItems:'center',  padding: '.5rem 1.2rem'}}>
   {data.length > 5 && <><OpenCloseBtn className={isExpanded ? 'btn-expanded' : 'btn-collapsed'} onClick={()=>setIsExpanded(!isExpanded)} /> <strong>Departures</strong></>}
    </div>
  )


  return <Container>
    {tableTitles}
    <Table id='table' className={!isExpanded ? 'tbl-collapse' : ''}>
      <thead>
        <tr>
          <th style={{ width: '15%' }}>
            Route
          </th>
          <th style={{ width: '70%' }}>
            Destination
          </th>
          <th style={{ width: '15%' }}>
            Departs
          </th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </Table>
    {tblFooter}
  </Container>
}

const Container = styled.div`
  transition: opacity .5s, transform .5s;
  margin-top:40px;
  margin-bottom:80px;
  background-color: #f5f5f4;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 70%;
  text-align: left;
  border:none;
`

const Table = styled.table`
  border-spacing: 0;
  background-color: #f5f5f4;
  transition: height 2s ease-in-out;
  overflow-y: hidden;
  height: 50%;

  vertical-align: middle;
  thead tr th {
    background-color: #ffd200;
    border-top: none;
    border-bottom: none;
    text-transform: uppercase;
    letter-spacing: 1.28px;
  }

  td,th {
    border-bottom: 1px solid #8a8b8a;
    min-width: 2em;
    padding: .75rem;

    &:first-child {
      padding-left: 1em;
    }

    &:last-child {
      padding-right: 1em;
      border-bottom:none;
    }
  }
`

const TableLabelDiv = styled.div`
  display:flex;
  justify-content:space-between;
  flex-direction:row;
  align-items:center;
  padding: 0 .75em 0 .75em;
  span{
    font-weight: 400;
    line-height: 1.5;
    color: #626462;
  }
`

const TableRow = styled.tr`
  height: 3em;
  background-color: transparent };
`

const OpenCloseBtn = styled.button`
  background-repeat: no-repeat;
  background-size: 1.25rem;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  top: .3rem;
  left: 1rem;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1.4375rem;
  cursor: pointer;

  &:focus{

  }
  &:hover {
    color: #626462;
    text-decoration: none;
}
`
