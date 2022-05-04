import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import {GrCart} from 'react-icons/gr'
import {HiHome} from 'react-icons/hi'
import { connect } from "react-redux";
import { store } from "../Redux/store";
import MiniCart from "./MiniCart";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: store.getState().currency,
      isMiniCartOpen: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ currency: store.getState().currency });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCurrency = (e) => {
    localStorage.setItem("preferredCurrency", e.target.value);
    this.props.changeCurrency(e.target.value);
  };

  showMiniCart = () => {
    this.setState({
      isMiniCartOpen: !this.state.isMiniCartOpen,
    });

    if (window.location.pathname.split("/")[1] === "cart") {
      this.setState({
        isMiniCartOpen: false,
      });
    }
  };

  render() {
    return (
      <nav className={styles.navbar}>
        <Link to="/">
          < HiHome  color="orange" size="50px" />
        </Link>

        <div className={styles.categories}>
          <span
            className={styles.category}
            onClick={() => this.props.changeCategory("all")}
          >
             All
          </span>
          <span
            className={styles.category}
            onClick={() => this.props.changeCategory("tech")}
          >
            Tech
          </span>
          <span
            className={styles.category}
            onClick={() => this.props.changeCategory("clothes")}
          >
            Clothes
          </span>
        </div>

        <div className={styles.misc}>
          <select
            className={styles.currency}
            value={this.state.currency}
            onChange={this.handleCurrency}
          >
            <option className={styles.currencyOption} value="USD">
              USD
            </option>
            <option className={styles.currencyOption} value="GBP">
              GBP
            </option>
            <option className={styles.currencyOption} value="AUD">
              AUD
            </option>
            <option className={styles.currencyOption} value="JPY">
              JPY
            </option>
            <option className={styles.currencyOption} value="RUB">
              RUB
            </option>
          </select>

          <button
            onClick={this.showMiniCart}
            aria-label="show shopping cart button"
          >
         <GrCart  />
         
            <span className={styles.badge}>{this.props.cartItemsCount}</span>
          </button>
        </div>

        {this.state.isMiniCartOpen && <MiniCart  />}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItemsCount: state.cart.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: "CATEGORY_UPDATE", category: category }),
    changeCurrency: (currency) =>
      dispatch({ type: "CURRENCY_UPDATE", currency: currency }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
