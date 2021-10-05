import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { StopDetailProps, TimePointDepartureProps } from '../types/transitApiDataTypes';
import '../App.css'
import { useEffect } from 'react';
import { useMemo } from 'react';

interface TableProps {
  totalLength : number
  data: TimePointDepartureProps[]
  stopInfo: StopDetailProps
  bottomNav?: string
}

export const DataTable = ({ data, stopInfo, bottomNav, totalLength }: TableProps) => {
  const history = useHistory()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    //page isn't large but wanted to scroll to top to show off the table easily upon reaching this page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  const routesSortedByActualTime = useMemo(()=>{
    //puts routes with actual time information first showing relative times at the top 
    //I initially thought all data was already filtered this way by the api but it was not
    return data.sort((a,b) => {
      if(!!a.Actual && !!!b.Actual){
        return -1
      }
      if(!!!a.Actual && !!b.Actual){
        return 1
      }
      return 0
    })
  }, [data])

  const tableTitles: JSX.Element = (
    <TableLabelDiv aria-label="Table labels: stop # and description">
      <h3>
        {stopInfo.StopLabel}
      </h3>
      <p><strong>stop #</strong> {stopInfo.StopID}</p>
    </TableLabelDiv>
  )
  const tableBody = (
    //creates the tables body if the data exists. 
    //also creates an expandable table by displaying half of the table length or 4 item (whichever is lower)
    !!data.length && routesSortedByActualTime.map((item: TimePointDepartureProps, index: number) => {
      if (!isExpanded && index > Math.min(Math.floor(data.length / 2), 4)) {
        return null
      }
      return (
        <TableRow key={item.DepartureText}>
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
  )

  const tblFooter: JSX.Element = (
    //this is either a button to nav to the table page or to expand the table
    //or to show no items exist
    <TableRow aria-label="table footer element" key="footer">
      <td colSpan={4}>
        {!!data.length ? totalLength >1 && <>
          <OpenCloseBtn
            className={isExpanded ? 'btn-expanded' : 'btn-collapsed'}
            onClick={() => {
              bottomNav ?history.push(bottomNav) : setIsExpanded(!isExpanded)
            }} /> <strong>View more departures</strong>
        </>
          :
          <strong>No departures at this time</strong>}
      </td>
    </TableRow>
  )


  return <Container>
    {tableTitles}
    <Table aria-label="Bus departures table">
      <thead>
        <TableRow key="table header">
          <th style={{ width: '15%' }}>
            Route
          </th>
          <th style={{ width: '70%' }}>
            Destination
          </th>
          <th style={{ width: '15%' }}>
            Departs
          </th>
        </TableRow>
      </thead>
      <tbody className={isExpanded ? 'tbl-expanded' : 'tbl-collapsed'}>
        {tableBody}
      </tbody>
      <tfoot>
        {tblFooter}
      </tfoot>
    </Table>
  </Container>
}

const Container = styled.div`
  transition: opacity .5s, transform .5s;
  margin-top: 40px;
  margin-bottom: 80px;
  background-color: #f5f5f4;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 60%;
  min-width: 600px;
  text-align: left;
  border: none;

`

const Table = styled.table`
  border-spacing: 0;
  background-color: #f5f5f4;
  vertical-align: middle;
  width:100%;

  thead tr th {
    background-color: #ffd200;
    border-top: none;
    border-bottom: none;
    text-transform: uppercase;
    letter-spacing: 1.28;
  }

  td,th {
    min-width: 2em;
    padding: .75rem;

    

    &:first-child {
      padding-left: 1em;
    }

    &:last-child {
      padding-right: 1em;
    }
  }
`

const TableLabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  transition: all .5s ease-in-out;
  padding: 0 .75em 0 .75em;
  span{
    font-weight: 400;
    line-height: 1.5;
    color: #626462;
  }
`

const TableRow = styled.tr`
  height: 3em;
  background-color: transparent;

    th{
      font-size: 1.25rem!important;
    }
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
