import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../Redux/store";
import styles from "../Styles/CartItem.module.css";


class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.data.quantity,
    };
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      const x = this.props.data.id;
      const item = store.getState().cart.find((item) => {
        return item.id === x;
      });

      this.setState({
        quantity: item.quantity ? item.quantity : 0,
      });
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  increment = () => {
    this.props.incrementQunatity(this.props.data.id);
  };

  decrement = () => {
    this.props.decrementQunatity(this.props.data.id);
  };

  removeItem = () => {
    this.props.removeItem(this.props.data.id);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.productDetails}>
          <div>
            <h4>{this.props.data.brand}</h4>
            <h3>{this.props.data.name}</h3>
            {this.props.price.currency && (
              <h4>
                {this.props.price.amount}
                {this.props.price.currency.symbol}
              </h4>
            )}
            <hr />
          </div>

          {Object.entries(this.props.data.attributes).map((attribute) => {
            return (
              <span key={attribute}>
                {attribute[0]}: <b>{attribute[1]}</b> |{" "}
              </span>
            );
          })}

          <h4>
            Total Price:{" "}
            {Math.round(this.props.data.quantity * this.props.price.amount)}
            {this.props.price.currency.symbol}
          </h4>
        </div>

        <div className={styles.productShowCase}>
          

          <img
            src={this.props.data.image}
            width="150"
            height="auto"
            alt="prodphoto"
           
          />
          <div>

          <span className={styles.productQuantity}>
            <button onClick={this.increment}>+</button>
            <b>{this.state.quantity}</b>
            <button onClick={this.decrement}>-</button>
          </span>

          <button
            onClick={this.removeItem}
            style={{
              height: "80px",
              width: "120px",
              padding: "20px",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "white",
              border: "1px solid red",
              color: "red",
            }}
          >
           Remove From Cart
          </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQunatity: (id) => dispatch({ type: "QUANTITY_INC", id }),
    decrementQunatity: (id) => dispatch({ type: "QUANTITY_DEC", id }),
    removeItem: (id) => dispatch({ type: "REMOVE_CART_ITEM", id }),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
