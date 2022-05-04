import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import styles from "../Styles/MiniCart.module.css";
import { Link } from "react-router-dom";

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    const totalPrices = [];

    return (
      <div className={styles.backdrop}>
        <div className={styles.minicart}>
          <h1 style={{ textAlign: "center" }}>
            {this.props.cartItems.length} Items In Cart
          </h1>

          <div className={styles.items}>
            {this.props.cartItems.map((item) => {
              const currentCurrencyPrice = item.prices.find(
                (currency) => currency.currency.label === this.props.currency
              );
              totalPrices.push(
                Math.round(item.quantity * currentCurrencyPrice.amount)
              );

              return (
                <CartItem
                  key={item.id}
                  price={currentCurrencyPrice}
                  data={item}
                />
              );
            })}
          </div>

          <h2 style={{ textAlign: "center" }}>
            Total Price: {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
            {this.props.currency}
          </h2>

          <div className={styles.showFullCart}>
            {/* button links to cart page */}
            <Link to="/cart">
              <button>Show Cart</button>
            </Link>

            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
  };
};
/*dispatches item atribute updates*/
const mapDispatchToProps = (dispatch) => {
  return {
    changeProductOptions: (productOption) =>
      dispatch({
        type: "PRODUCT_OPTIONS_UPDATE",
        productOptions: productOption,
      }),
    clearCartItems: () => dispatch({ type: "CLEAR_CART" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
