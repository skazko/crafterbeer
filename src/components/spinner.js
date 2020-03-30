import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;`;

const SpinnerIndicator = styled.div`
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }

  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 0.3rem solid lightseagreen;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner 1s linear infinite;`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerIndicator role="status" />
    </SpinnerContainer>
  )
}
export default Spinner;