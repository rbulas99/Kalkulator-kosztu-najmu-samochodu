import React, { useState } from 'react';
import styled from 'styled-components';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Car, Category } from './interfaces';
import { carsArray } from './carsArray';
import { useNavigate } from 'react-router-dom';



function App() {
  const [carList, setCarList] = useState<Car[]>([]);
  const navigate = useNavigate();

  const setCar = (value: Category) =>
  {
    
    setCarList(carsArray.filter((car) => car.type === value));
  }
  const carCard = carList.map((car) =>
    <Item key={car.id} onClick={()=>navigate(car.id.toString())}>
      <Detail>{car.manufacturer}  {car.model}</Detail> 
      <Price>{car.value} PLN</Price> 
      <img  src={car.img_url}/>
    </Item>
  );

  return (
    <Container>
      <Logo>Find Your Perfect Car</Logo>
      <Wrapper>
       
        <CarClass>
            <FormControl  >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Basic" control={<Radio onClick={() => setCar(Category.Basic)}/>}  label="Basic" />
                <FormControlLabel value="Standard" control={<Radio onClick={() => setCar(Category.Standard)}/> } label="Standard" />
                <FormControlLabel value="Medium" control={<Radio onClick={() => setCar(Category.Medium)}/> } label="Medium" />
                <FormControlLabel value="Premium" control={<Radio onClick={() => setCar(Category.Premium)}/> } label="Premium" />
                
              </RadioGroup>
            </FormControl>
           
                
          </CarClass>
            <CarCardsWrapper>
              {carCard}
            </CarCardsWrapper>


      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('img/background.jpg');
  background-size: cover;

 
 
`;
const Wrapper = styled.div`

  display:flex;
  align-items:center;
  width: 100% ;
  height:80%;
  flex-direction: column;
`;
const Logo = styled.div`
  font-size:64px;
  color:white;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  position:absolute:
  top:0;
  width:100%;
  text-align: center;
  padding-top:10px;
  letter-spacing:2px;
  @media only screen and (max-width: 800px) {
    font-size:48px;
  }
  @media only screen and (max-width: 600px) {
    font-size:32px;
  }
`;
const CarClass = styled.div`
  width: 60%;
  height:10%;
  position:absolute;
  top:70px;
  box-sizing: border-box;
  padding:10px;
  display:flex;
  align-items:center;
  justify-content: space-around;  
  border-radius:40px;
  margin:30px;

  background-color:rgba(255,255,255,1);
  @media only screen and (max-width: 800px) {
    width:90%;
  }


`;
const CarCardsWrapper = styled.div`
  width: 60%;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  position: absolute;
  top: 200px;
  
  
`
const Item = styled.div`
  background-color:rgba(255,255,255,1);
  margin:10px;
  padding: 10px;
  border-sizing: border-box;
  position: relative;
  border-radius: 10px;
  display:flex;
  justify-content:center;
  height:120px;
  img{
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    right: 20px;
    margin-left: 10px;
    @media only screen and (max-width: 800px) {
      max-width:50%;
      max-height:50%;
      bottom:0px;
    }

  }
  &:hover{
    cursor: pointer;
  }


`
const Detail = styled.div`
  font-size: 32px;
  position: absolute;
  left:20px;

`
const Price = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
`

export default App;
