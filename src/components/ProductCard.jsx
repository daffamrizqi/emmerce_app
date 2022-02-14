import "../assets/styles/product_card.css"
import React from "react"

class ProductCard extends React.Component {
    render () {
        return (
            <div className="card product-card" >
                <img src={this.props.productData.productImage} 
                alt="Jackson Guitar" />
                <div className="mt-2">
                    <div>
                        <h6> {this.props.productData.productName} </h6>
                        <span className="text-muted">Rp. {this.props.productData.price} </span>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mt-2">Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard;