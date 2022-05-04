import React, { Component } from 'react'
import ProductOptions from '../Components/ProductOptions'
import styles from "../Styles/PDP.module.css"
import { gql } from "@apollo/client"
import { Query } from '@apollo/client/react/components'
import {store} from '../Redux/store';
import { connect } from 'react-redux'

class PDP extends Component {
  constructor(props){
    super(props)
    this.state ={
      productID: store.getState().productID,
      currency: store.getState().currency,
      imageIndex: 0
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({productID: store.getState().productID, currency: store.getState().currency})
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleImage = (index) =>{
    this.setState({imageIndex: index})
  }

  render() {
    const GET_DATA = gql`{
      product(id : ${JSON.stringify(this.state.productID)}){
        name
        description
        brand
        inStock
        gallery
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            id
            value
          }
        }
      }
    }`;

    return (
      <Query query={GET_DATA}>
        {({data, loading, error})=>{
            
          if (error) return <h1>Error</h1>

          if (loading) return <h1>Loading...</h1>
              
            else {
              const currentCurrencyPrice = data.product.prices.find(currency=> currency.currency.label === this.state.currency)
              return (
                <div className={styles.container}>
  
                  <div className={styles.productInfo}>
                    {/*product name details price */}
                    <h1>{data.product.name}</h1>
                    <h2>Price: {currentCurrencyPrice.currency.symbol}{currentCurrencyPrice.amount}</h2>  
                    
                    <hr />

                    <ProductOptions data={data.product} />
                                      
                    <hr />
                    {/*brand and description */}
                   <h3 ><b> Brand: {data.product.brand}</b></h3>
                   <div style={{paddingBottom:"10px" ,paddingTop:"10px", fontSize:"20px"}}> <h5>Product Description:</h5></div>
                    <div dangerouslySetInnerHTML={{__html: data.product.description}}></div>                    

                  </div>
  {/*maps in product photos index */}
                  <div className={styles.productImages}>
                    <img src={data.product.gallery[this.state.imageIndex]} alt={data.product.name} height="400" />
                    <br />
                    {data.product.gallery.map((image, index)=>{
                      return <img src={image} key={image} width="auto" alt="prodphoto" height="100" onClick={()=>this.handleImage(index)}/>
                    })}
                  </div>
                  
                </div>
              );
            }            
          }
        }
      </Query>
    )
  }
}



export default connect(null)(PDP);