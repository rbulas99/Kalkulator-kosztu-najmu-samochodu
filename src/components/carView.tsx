import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { carsArray } from "../carsArray";
import { Car, Category, FinalResult } from "../interfaces";
import Slider from "@mui/material/Slider";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { currentYear, FUEL_PRICE, RENTAL_PRICE, VAT_RATE } from '../constants';

export const CarView = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  

  const defaultResults = {
    netto: 0,
    brutto: 0,
    fuelPrice: 0,
    priceForDay: 0,
    numberOfDays: 0,
  };
  const navigate = useNavigate();
  
  const [error, setError] = useState(false);

  const [showForm, setShowForm] = useState(true);
  const [range, setRange] = useState(0);
  const [year, setYear] = useState(0);
  const [dateFrom, setDateFrom] = useState(currentDate);
  const [dateTo, setDateTo] = useState(currentDate);
  const [finalResult, setFinalResult] = useState<FinalResult>(defaultResults);

  const id = useParams();
  
  const car = carsArray.find(car => car.id === Number(id.id));
  
  const changeRange = (event: Event, value: any) => {
    setRange(value);
    console.log(range);
  };
  const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
    console.log(year);
  };
  const changeDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(event.target.value);
    console.log(dateFrom);
  };
  const changeDateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(event.target.value);
    console.log(dateTo);
  };

  const calculate = (car: any) => {
    let valiDate =
      Date.parse(dateTo) - Date.parse(dateFrom) >= 0 &&
      Date.parse(dateFrom) >= Date.parse(currentDate);
    if (valiDate && year > 1930 && year <= currentYear) {
      setShowForm(false);
      if (car.type === "Premium" && year > (currentYear - 5)) {
        alert("You cant rent this car");
        navigate("/");
      }

      let result = RENTAL_PRICE;
      switch (car.type) {
        case "Premium":
          result = result * 2;
          break;
        case "Medium":
          result = result * 1.6;
          break;
        case "Standard":
          result = result * 1.3;
          break;
        default:
          result = result * 1;
          break;
      }
      if (year >  (currentYear - 5)) {
        result = result * 1.2;
      }
      if (car.numberOfUnits < 3) {
        result = result * 1.15;
      }

      let numberOfDays =
        1 + (Date.parse(dateTo) - Date.parse(dateFrom)) / (1000 * 3600 * 24);
      result = result * numberOfDays;
      result = result + (range / 100) * car.fuelConsumption * FUEL_PRICE;

      console.log(range, year, result, numberOfDays);

      const costs: FinalResult = {
        netto: Math.ceil(result * 100) / 100,
        brutto: Math.ceil(result * VAT_RATE * 100) / 100,
        fuelPrice:
          Math.ceil((range / 100) * car.fuelConsumption * FUEL_PRICE * 100) /
          100,
        priceForDay: Math.ceil((result / numberOfDays) * VAT_RATE * 100) / 100,
        numberOfDays: numberOfDays,
      };
      setFinalResult(costs);
    } else {
      setError(true);
    }
  };



  return (
    <Container>
      <Logo>Find Your Perfect Car</Logo>
      <Item>
        <Detail>
          {car?.manufacturer} {car?.model}
        </Detail>
        <Price>{car?.value} PLN</Price>
        <img src={car?.img_url} />
      </Item>
      {showForm ? (
        <Wrapper>
          <Form>
            <SliderWrapper>
              <Slider
                aria-label="Always visible"
                defaultValue={0}
                step={100}
                max={2500}
                valueLabelDisplay="on"
                onChange={changeRange}
              />
              <FormHelperText>Select Range:[km] </FormHelperText>
            </SliderWrapper>
            <SelectWrapper>
              <TextField
                id="outlined-number"
                onChange={getValue}
                label="Year"
                error={error}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText>Driving license since: </FormHelperText>
            </SelectWrapper>

            <DatePickerWrapper>
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  onChange={changeDateFrom}
                  id="datefrom"
                  label="From: "
                  type="date"
                  defaultValue={currentDate}
                  error={error}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  onChange={changeDateTo}
                  id="dateto"
                  label="To: "
                  type="date"
                  defaultValue={currentDate}
                  error={error}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </DatePickerWrapper>

            <Button onClick={() => calculate(car)}>Submit </Button>
            <Return onClick={() => navigate("/")}>Return </Return>
          </Form>
        </Wrapper>
      ) : (
        <Result>
          <Form>
            <ResultDetail>
              <h3>Brutto</h3>
              {finalResult.brutto}PLN
            </ResultDetail>
            <ResultDetail>
              <h3>Netto</h3>
              {finalResult.netto}PLN
            </ResultDetail>
            <ResultDetail>
              <h3>Fuel Price: </h3>
              {finalResult.fuelPrice}PLN
            </ResultDetail>
            <ResultDetail>
              <h3>Days: </h3>
              {finalResult.numberOfDays}
            </ResultDetail>
            <ResultDetail>
              <h3>Price for day: </h3>
              {finalResult.priceForDay}PLN
            </ResultDetail>
          </Form>
        </Result>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("img/background.jpg");
  background-size: cover;
  box-sizing: border-box;
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
  @media only screen and (max-width: 900px) {
    font-size:48px;
  }
  @media only screen and (max-width: 600px) {
    font-size:32px;
  }
  

`;
const Item = styled.div`
  background-color:rgba(255,255,255,1);
  margin:10px;
  padding: 10px;
  border-sizing: border-box;
  margin: 0 auto;

  width:90%;
  position: relative;
  border-radius: 10px;
  display:flex;
  justify-content:center;
  height:160px;
  img{
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    right: 10px;
    bottom:10px;
    margin-left: 10px;
    @media only screen and (max-width: 900px) {
      max-width: 60%;
      max-height: 60%;
  }


`;
const Detail = styled.div`
  font-size: 32px;
  position: absolute;
  left: 10px;
`;
const Price = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const Form = styled.div`
  width: 60%;
  background-color: white;
  height: 40%;
  box-sizing: border-box;
  border-radius: 40px;

  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
  @media only screen and (max-width: 900px) {
    flex-direction: rows;
    height: 80%;
  }
`;
const SliderWrapper = styled.div`
  width: 33%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 20%;
  }
  div {
    font-family: "Roboto", sans-serif;
  }
`;

const SelectWrapper = styled.div`
  width: 33%;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 20%;
  }
`;
const DatePickerWrapper = styled.div`
  width: 33%;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 20%;
  }
`;
const Wrapper = styled.div`
  box-sizing: box-model;
  display: flex;
  justify-content: center;
  height: 450px;
`;
const Button = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #13753f, #49be25);

  padding: 10px;
  border-radius: 30px;
  margin-top: 20px;
  color: white;
  font-size: 24px;
  @media only screen and (max-width: 900px) {
    margin-top: 20px;
    padding: 0px;
  }
  &:hover {
    background: linear-gradient(45deg, #25975f, #67df47);
    cursor: pointer;
  }
`;
const Return = styled.button`
  width: 60%;
  background: linear-gradient(45deg, #b30000, #ff0000);

  padding: 10px;
  border-radius: 30px;
  margin: 10px auto;
  color: white;
  font-size: 24px;
  @media only screen and (max-width: 900px) {
    display: none;
  }
  &:hover {
    cursor: pointer;
    background: linear-gradient(45deg, #d52222, #ff2222);
  }
`;
const Result = styled.div`
  box-sizing: box-model;
  display: flex;
  justify-content: center;
  height: 450px;
`;
const ResultDetail = styled.div`
  width: 20%;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 15%;
  }
`;
