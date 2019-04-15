// Import React and Component
import React, { Component } from "react";
// Import CSS from App.css
import "./App.css";
import CurrencyStatus from "./status/CurrencyStatus";
import { askForPermissionToReceiveNotifications } from "./notifications/firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null
    };
  }

  getToken = () => {
    askForPermissionToReceiveNotifications().then(resp => {
      this.setState({ token: resp });
    });
  };

  render() {
    return (
      <div className="main-container">
        <div className="topheader">
          <header className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <span className="navbar-item">
                  Blockchain Currency Latest Prices
                </span>
              </div>
              <div className="navbar-end">
                <nav className="navbar-item" onClick={this.getToken}>
                  Want to receive Push Notifications ?
                </nav>
              </div>
            </nav>
          </header>
        </div>
        <section className="results--section">
          <div className="container">
            <h1>
              Get to know about the latest block chain currency prices
              <br /> BTC, ETH and LTC
            </h1>
          </div>
          <div className="results--section__inner">
            <CurrencyStatus token={this.state.token} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
