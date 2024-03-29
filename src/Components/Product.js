import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/Product.module.css"
import { connect } from 'react-redux'
import { store } from '../Redux/store'

class Product extends Component {
  constructor(props){
    super(props)
    this.state = {
      currency: store.getState().currency,
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({
        currency: store.getState().currency,
      })
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {
    const currentCurrencyPrice = this.props.data.prices.find(currency=> currency.currency.label === this.state.currency)
    return (
      <div className={styles.container}>
{/* in stock text */}
 <h3 style={{textAlign:'center'}} > {this.props.data.inStock ? <p>In Stock</p> : <p style={{color:"red"}} >Out Of Stock</p>}</h3>

{/* Links to product page with data.id */}

        <Link to={`/product/${this.props.data.id}` }  >
          <img
            src={this.props.data.gallery[0]}
            height="300px"
            width="auto"
            alt={this.props.data.name}
            className={styles.productImg}
            onClick={()=>this.props.changeProductID(this.props.data.id)}
          />
        
        </Link>
        {/*name price symbol */}
        <div className={styles.details}>
            <h4>{this.props.data.name}</h4>

            <h5>
              {currentCurrencyPrice.currency.symbol}
              {currentCurrencyPrice.amount}
            </h5>
        </div>
        
      </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    changeProductID: (productID)=> dispatch({type: "PRODUCT_ID_UPDATE", productID: productID}),
  }
}

export default connect(null, mapDispatchToProps)(Product)