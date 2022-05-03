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
       
<h3 style={{fontSize:"40px", textAlign:"center"}} >Your Cart</h3>
        <div
          
        >
          {this.props.cartItems.map((item) => {
            const currentCurrencyPrice = item.prices.find(
              (currency) => currency.currency.label === this.props.currency
            );

            totalPrices.push(
             Math.round(item.quantity * currentCurrencyPrice.amount)
            );

            return (
              <CartItem key={item.id} price={currentCurrencyPrice} data={item} />
            );
          })}
        </div>

        <div style={{ textAlign: "right", margin: "20px auto" }}>

          <h2>
            Total Price: {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
            {this.props.currency}
          </h2>
        </div>
        <button
          onClick={this.clearCart}
          style={{
            margin: "20px auto",
            padding: "1%",
            display: "block",
            height: "60px",
            width: "200px",
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
