import Head from 'next/head'
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Harry Potter Quiz</title>

        <meta charSet="utf-8" />
        <meta property="og:image" content={db.bg}/>
        <meta name="theme-color" content="#cfb421"/>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Harry Potter Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Será que você é um verdadeiro PotterHead?</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Harry Potter Quiz</h1>
            <p>Será que você é um verdadeiro PotterHead?</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/lucianoweslen11"/>
    </QuizBackground>
  )
}
