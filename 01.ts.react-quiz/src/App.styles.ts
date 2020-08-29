import styled, { createGlobalStyle } from 'styled-components';

//@ts-ignore
import background from './images/background.jpg';

export const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100vh;
  }

  body {
    background-image: url(${background});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    color: #0085a3;
    font-size: 35px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    cursor: pointer;
    background-color: #ffcc91;
    border: 2px solid #d38558;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    font-size: 20px;
    color: #333;
  }

  .start {
    max-width: 200px;
  }
`;
