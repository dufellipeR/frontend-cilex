import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { Form } from '@unform/web';

const appearFromLeft = keyframes`
 from {
  opacity: 0;
  transform: translateX(-100px);

 }
 to {
  opacity:1;
  transform: translateX(0)
 }
`;

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.5fr 0.2fr;
  /* grid-gap: 10px; */
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  margin-top: 30px;
  button {
    max-width: 100px;
  }
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #ff7a00;
  }
`;

export const Greetings = styled.div`
  margin-right: 5px;
  h2 {
    margin-bottom: 5px;
    font-size: 3vw;
  }

  h3 {
    margin-bottom: 15px;
    font-size: 1.5vw;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2%;
  text-align: center;
`;

export const InfoHeader = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
  margin-bottom: 30px;
  h3 {
    color: #6a6c72;
  }
`;

export const Options = styled.div`
  line-height: 0.1;
`;

export const EditBtn = styled.button`
  background-color: #ff7a00;
  border: 1px solid #ff7a00;
  padding: 5px;
  border-radius: 10%;
  margin-left: 10px;
  color: #fefefe;
`;

export const DeleteBtn = styled.button`
  background-color: transparent;
  border: 1px solid #ff7a00;
  padding: 5px;
  border-radius: 10%;
  margin-left: 10px;
  color: #fefefe;
`;

export const InfoBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid #ff7a00; */
`;

export const Badge = styled.span`
  background-color: transparent;
  border: 1px solid #ff7a00;
  color: #ff7a00;
  padding: 5px;
`;

export const FormCustom = styled(Form)``;

export const GroupInput = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 10px;
`;

export const Main = styled.main`
  text-align: -webkit-center;
  margin: 5%;
`;
