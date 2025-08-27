import styled from 'styled-components'
const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);

  padding: 3rem 2rem 4rem;
  padding-bottom: 0.5rem;
  /* .bounce-input-warpper {
    margin-top: 2rem;
  } */
  .bounce-input {
    background-color: black;
    padding: 0.5rem;
    border-radius: 0.3rem;
    color: white;
  }
  .bounce-button {
    margin-left: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem;
    color: white;
    background: teal;
  }
  .bounceTime {
    margin-top: 1rem;
  }
  .reset-values-wrapper {
    display: inline-block;
  }
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`

export default Wrapper
