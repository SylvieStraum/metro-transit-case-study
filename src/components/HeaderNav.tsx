import styled from 'styled-components';
import { useHistory } from 'react-router';

export const HeaderNav =() =>{
  const history = useHistory()

  return(
    <Header aria-label="nav">
            <img alt="metro transit Logo" src="https://www.metrotransit.org/img/MetroTransitLogo.svg" onClick={()=>history.push('/')}/>
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