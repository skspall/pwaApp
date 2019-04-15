import React, { Component } from "react";
import axios from "axios";
import "./CurrencyStatus.css";

class CurrencyStatus extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor(props) {
    super(props);
    this.state = {
      btcprice: "",
      ltcprice: "",
      ethprice: "",
      token: props.token
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.token !== prevState.token) {
      return { ...prevState, token: nextProps.token };
    } else {
      return prevState;
    }
  }

  componentDidMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
      )
      .then(({ data: { BTC, ETH, LTC } }) => {
        // We set the latest prices in the state to the prices gotten from Cryptocurrency.
        this.setState({ btcprice: BTC.USD });
        this.setState({ ethprice: ETH.USD });
        this.setState({ ltcprice: LTC.USD });
      })
      // Catch any error here
      .catch(error => {
        console.log(error);
      });
    this.priceSubscription = setInterval(() => {
      axios
        .get(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
        )
        .then(({ data }) => {
          this.sendPricePusher(data);
        })
        .catch(error => {
          console.log(error);
        });
    }, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.priceSubscription);
  }

  sendPricePusher(prices) {
    axios
      .post("https://node-pwa-app.firebaseapp.com/prices/new", {
        prices: prices,
        token: this.state.token
      })
      .then(() => {
        this.setState({
          btcprice: prices.BTC.USD,
          ethprice: prices.ETH.USD,
          ltcprice: prices.LTC.USD
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    return (
      <div className="today--section container">
        <h2>Current Price</h2>
        <div className="columns today--section__box">
          <div className="column btc--section">
            <h5>${this.state.btcprice}</h5>
            <p>1 BTC</p>
          </div>
          <div className="column eth--section">
            <h5>${this.state.ethprice}</h5>
            <p>1 ETH</p>
          </div>
          <div className="column ltc--section">
            <h5>${this.state.ltcprice}</h5>
            <p>1 LTC</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyStatus;
