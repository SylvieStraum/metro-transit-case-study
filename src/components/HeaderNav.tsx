import styled from 'styled-components';
import { useHistory } from 'react-router';

export const HeaderNav =() =>{
  const history = useHistory()
  //just a very simple header component for flair with the metro transit logo that can act as a home button
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
cursor: pointer;
`