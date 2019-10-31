import styled, { css } from 'styled-components';
export const Input = styled.input`
  font-size: ${props => props.fontSize};
  outline: none;
  background-color: #dcf5f7;
  text-transform: uppercase;
  border: 0;
  text-align: center;
  width: 250px;
  ${props =>
    props.rounded &&
    css`
      border-radius: 16px;
    `};
`;
