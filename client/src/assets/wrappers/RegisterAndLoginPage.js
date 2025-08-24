import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: red;
  align-items: center;
  /*  justify-content: center; */
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    margin-top: 0.5rem;
    text-align: center;
    line-height: 1.4;
  }
  .btn {
    margin-top: 0.5rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`
export default Wrapper
