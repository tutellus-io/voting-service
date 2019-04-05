import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
  /* Base 10 typography scale courtesty of @wesbos 1.6rem === 16px */
  html {
    font-size: 10px;
  }
  body {
    font-size: 1.6rem;
  }

  /* https://css-tricks.com/snippets/css/system-font-stack/ */
  /* Define the "system" font family */
  /* Fastest loading font - the one native to their device */
  @font-face {
    font-family: system;
    font-style: normal;
    font-weight: 300;
    src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
  }
  /* Modern CSS Reset */
  /* https://alligator.io/css/minimal-css-reset/ */
  body, h1, h2, h3, h4, h5, h6, p, ol, ul{
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  body, h1, h2, h3, h4, h5, h6, p, ol, ul, input[type=text], input[type=email], button {
    font-family: Lato, "system"
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  ol, ul {
    list-style: none;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  /* Links */
  a {
    text-decoration: underline;
    color: inherit;
  &.active {
      text-decoration: none;
    }
  }
`
