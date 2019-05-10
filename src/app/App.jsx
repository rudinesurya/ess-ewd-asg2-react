import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './features/navigationBar/NavBar';
import Footer from './features/navigationBar/Footer';
import Router from './router/Router';

function App() {
  return (
    <div>
      <NavBar />
      <Container className="main">
        <Router />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
