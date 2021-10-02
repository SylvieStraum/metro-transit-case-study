import styled from 'styled-components';

export const HeaderNav =() =>{

  return(
    <Header aria-label="nav">
            <img alt="metro transit Logo" src="https://www.metrotransit.org/img/MetroTransitLogo.svg" />
    </Header>
  )
  
}

const Header = styled.header`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: flex-start;
padding: .5rem .75rem;
`