import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Harry Potter Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Será que você é um verdadeiro PotterHead?</p>
            <form
              onSubmit={
                function (event) {
                  event.preventDefault();
                  router.push(`/quiz?name=${name}`);
                }
              }
            >
              <Input
                name="name_user"
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React #2 fez:</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/lucianoweslen11/harry-potter-quiz" />
    </QuizBackground>
  );
}
