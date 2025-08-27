import styled from 'styled-components'

export const PaginationWrapper = styled.div`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  /* background-color: teal; */
  padding-bottom: 0.5rem;

  .page-number {
    margin: 0 0.7rem;
  }

  button {
    background-color: var(--grey-800);
    margin: 0 0.7rem;
  }
  .activePage {
    padding: 0.5rem;
    border-radius: 0.2rem;
    background-color: var(--primary-500);
  }
  @media (min-width: 992px) {
  }
`
