import { createGlobalStyle } from 'styled-components';

interface ThemeProps {
  theme: {
    main: string;
    mainHover: string;
    greenColor: string;
  };
}

export default createGlobalStyle<ThemeProps>`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background-color: #FEFFFE;
    color: rgb(22, 22, 22);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .button-filled {
    background: ${props => props.theme.main};
    color: #fff;

    &:hover {
      background-color: ${props => props.theme.mainHover};
    }
  }

  .button-outline {
    background: rgba(0, 0, 0, 0);
    color: ${props => props.theme.main};
    border: 1px solid ${props => props.theme.main};
  }

  .button-green {
    background-color: ${props => props.theme.greenColor};
    color: #fff;
  }
`;
