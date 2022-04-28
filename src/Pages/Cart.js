import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../Components/CartItem";

class Cart extends Component {
  clearCart = () => {
    this.props.clearCartItems();
  };

  render() {
    const totalPrices = [];

    return (
      <div style={{ padding: "10px 10%" }}>
        <button
          onClick={this.clearCart}
          style={{
            margin: "20px auto",
            padding: "1%",
            display: "block",
            height: "max-content",
            width: "max-content",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "2rem",
            backgroundColor: "red",
            border: "none",
            color: "white",
            boxShadow: "2px 2px 10px black",
          }}
        >
          Clear Cart
        </button>

        <div
          style={{ height: "50vh", overflowX: "hidden", overflowY: "scroll" }}
        >
          {this.props.cartItems.map((item) => {
            const currentCurrencyPrice = item.prices.find(
              (currency) => currency.currency.label === this.props.currency
            );

            totalPrices.push(
              Math.ceil(item.quantity * currentCurrencyPrice.amount)
            );

            return (
              <CartItem key={item.id} price={currentCurrencyPrice} data={item} />
            );
          })}
        </div>

        <div style={{ textAlign: "center", margin: "20px auto" }}>
          <h2>{this.props.cartItems.length} Items</h2>

          <h2>
            Total Price: {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
            {this.props.currency}
          </h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
