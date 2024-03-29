import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductOptions extends Component {

    constructor(props){
        super(props)
        this.state = {
            product: {
                attributes: {}
            },
            quantityError : null,
            addToCartMsg: "Select Option To Add To Cart"
        }
    }

    createProductObject = () => {
      const product = {
        name: this.props.data.name,
        prices: this.props.data.prices,
        image: this.props.data.gallery[0],
        brand: this.props.data.brand,
        quantity: 1,
        id: Math.round(Math.random()*1000),
        attributes: {}
        }

      this.props.data.attributes.forEach(attribute => {
        product.attributes[attribute.name] = ""
      });

      this.setState({
        product: product
      })
    }

    componentDidMount(){
        this.createProductObject()
    }
 
    handleChoice = (attributeName, itemID) => {
        this.setState({
            product: {
                ...this.state.product,
                
                attributes: {
                    ...this.state.product.attributes,
                    [attributeName]: itemID

                }
            }
        })
    }

    handleCart = () => {
      this.props.addtoCart(this.state.product);
      this.setState({
        addToCartMsg: "Added To Cart!"
      })

      this.createProductObject()


      setTimeout(()=>{
        this.setState({
          addToCartMsg: "Select Option To Add To Cart"
        })
      }, 2000)
      
    }

    handleQuantity = (e) =>{
      
        this.setState({
          product:{
            ...this.state.product,
            quantity: e.target.value
          },
          quantityError: null
        })
      
    }

  render() {

/* Checks if prod is in stock */

    if(!this.props.data.inStock){
      return(
        <h2 style={{color:"red", fontSize:"20px", textAlign:"center"}}>
          OUT OF STOCK !
        </h2>
      )
    }
      
    return (
      <>
      {/*atributes */}
        {this.props.data.attributes.map((attribute) => {
          return (
            <div key={attribute.name}>

              <span key={attribute.name}><b> {this.state.product.attributes[attribute.name] || "Choose "+attribute.name}</b> 
              </span>
                <br />
              {attribute.items.map((item) => {
                return (
                  /*colore buttons */
                  <button 
                  style={{ backgroundColor: item.value, border:"1px solid", borderRadius:"5px", width: "max", height: "max",
                  margin:"8px", padding: "1%"}} 
                  key={item.id} 
                  onClick={() => this.handleChoice(attribute.name, item.id )}
                   >
                    {attribute.type === "swatch"? "" : item.displayValue}
                  </button>
                
                );
              })}
            </div>
            
          );
        })}

{/* input quantity */}
        <div>
          
          <input type="number" max="10" min="1" id="quantity" placeholder='Enter Quantity MAX:10'  style={{width:"280px", height:"20px"}}  onChange={this.handleQuantity}/>
        </div>
        
        {!Object.values(this.state.product.attributes).some(choice=> choice === "") && !this.state.quantityError ?
            (<button onClick={this.handleCart} style={{width:"80%", marginTop:"20px", height:"2em" ,backgroundColor:' rgb(255,165,0)'}}>Add to Cart</button>)
            :
            (<h6 style={{marginTop:"20px", textAlign:"left", height:"2em" , fontSize:"25px"}}>{this.state.addToCartMsg}</h6> )
        }

      </>
    );
  }
}

const mapStateToProps = (state) => {
    return{
       cartItems : state.cart
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
      addtoCart: (product)=> dispatch({type: "ADD_TO_CART", product}),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions)