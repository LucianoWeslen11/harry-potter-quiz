import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 600px){
    margin: auto;
    max-width: 400px;
    padding: 15px;
  }
`;

export default QuizContainer;
