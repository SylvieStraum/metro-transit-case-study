import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StopDetailProps, TimePointDepartureProps } from '../types/transitApitTypes';

interface TableProps {
  data: TimePointDepartureProps[]
  stopInfo:StopDetailProps
}

export const DataTable = ({ data, stopInfo }: TableProps) => {

  const tableTitles =(
    <tr>
      <th style={{textAlign:'left', width:'50%'}}>
        {stopInfo.StopLabel}
      </th>
      <th style={{textAlign:'right', width:'70%'}}>
        #{stopInfo.StopID}
      </th>
    </tr>
  )

  const tableBody = (
    !!data.length ? data.map((item:TimePointDepartureProps, index:number) => {
      return (
        <tr key={index}>
          <td style={{ width: '20%' }}>
            {item.Route}
          </td>
          <td style={{ width: '60%' }}>
            {item.Description}
          </td>
          <td style={{ width: '20%' }}>
            {item.DepartureText}
          </td>
        </tr>
      )
    })
    :
    <tr>
      <td style={{width:'40%'}}>
        No departures at this time
      </td>
    </tr>
  )


  return <Container>
    <Table>
      <thead>
        {tableTitles}
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
  </Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 70%;
  text-align: left;
`

const Table = styled.table`
  border-spacing: 0;

  td,th {
    min-width: 2em;

    &:first-child {
      padding-left: 1em;
    }

    &:last-child {
      padding-right: 1em;
    }
  }
`

const TableRow = styled.tr`
  height: 3em;
  background-color: transparent };
`

const TableHeaderCellContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
