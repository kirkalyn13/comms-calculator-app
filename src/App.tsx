import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import InfoCapacity from './components/calculators/InfoCapacity';
import NoiseFactor from './components/calculators/NoiseFactor';
import AntennaGain from './components/calculators/AntennaGain';
import ParabolicGain from './components/calculators/ParabolicGain';
import FSPL from './components/calculators/FSPL';
import RadioRange from './components/calculators/RadioRange';
import EIRP from './components/calculators/EIRP';
import IRL from './components/calculators/IRL';
import LinkBudget from './components/calculators/LinkBudget';

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <div className="container-body">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/information_capacity">
            <InfoCapacity />
          </Route>
          <Route path="/noise_factor">
            <NoiseFactor />
          </Route>
          <Route path="/antenna_gain">
            <AntennaGain />
          </Route>
          <Route path="/parabolic_antenna_gain">
            <ParabolicGain />
          </Route>
          <Route path="/radio_range">
            <RadioRange/>
          </Route>
          <Route path="/free_space_path_loss">
            <FSPL/>
          </Route>
          <Route path="/effective_isotropic_radiated_power">
            <EIRP/>
          </Route>
          <Route path="/isotropic_receive_level">
            <IRL/>
          </Route>
          <Route path="/link_budget">
            <LinkBudget/>
          </Route>
        </Switch>
      </div>
      <Footer />
      </div>
    </Router>
    
  );
}

export default App;
