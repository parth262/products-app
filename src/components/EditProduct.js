import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../actions/products';
import { Redirect } from 'react-router-dom';
import {pricingInfo} from '../products';

class EditProduct extends React.Component {

    constructor(props) {
        super(props);
        const product = this.props.products.find(product => product.id === Number(this.props.match.params.productId))
        
        this.state = {...product};

        this.modifyProduct = this.modifyProduct.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handlePriceTierChange = this.handlePriceTierChange.bind(this);
        this.handleEditableChange = this.handleEditableChange.bind(this);
    }

    handleEditableChange(isEditable) {
        this.setState({isEditable});
    }

    handlePriceTierChange(pricingTier) {
        this.setState({pricingTier, priceRange: pricingInfo[pricingTier][0]});
    }

    handleFieldChange(field, e) {
        this.setState({[field]: e.target.value})
    }

    modifyProduct() {
        this.props.dispatch(updateProduct(this.state));
        this.setState({backHome: true});
    }

    render() {

        if(this.state.backHome) {
            return <Redirect to="/"/>
        }

        const isValid = this.state.name && 
                        this.state.weight &&
                        this.state.productUrl

        console.log(isValid)

        return <div className="editProduct">
            <form >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={this.state.name} 
                        onChange={e => this.handleFieldChange("name", e)} />
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="weight" 
                        value={this.state.weight}
                        onChange={e => this.handleFieldChange("weight", e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="availability">Availability</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="availability" 
                        value={this.state.availability} 
                        onChange={e => this.handleFieldChange("availability", e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="productUrl">Product URL</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productUrl" 
                        value={this.state.productUrl}
                        onChange={e => this.handleFieldChange("productUrl", e)}/>
                </div>
                <div className="form-group">
                    <label>Price Tier</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="pricingTier" 
                                id="budget"
                                checked={this.state.pricingTier==="budget"}
                                onChange={() => this.handlePriceTierChange("budget")}/>
                            <label className="form-check-label" htmlFor="budget">Budget</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="pricingTier" 
                                id="premier" 
                                checked={this.state.pricingTier==="premier"}
                                onChange={() => this.handlePriceTierChange("premier")}/>
                            <label className="form-check-label" htmlFor="premier">Premier</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="pricingRange">Price Range</label>
                    <select 
                        className="form-control" 
                        id="pricingRange"
                        value={this.state.priceRange}
                        onChange={e => this.handleFieldChange("priceRange", e)}>
                        {pricingInfo[this.state.pricingTier]
                            .map((priceRange, i) => <option key={i}>{priceRange}</option>)}
                    </select>
                </div>
                <div className="form-group form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="isEditable"
                        checked={this.state.isEditable}
                        onChange={e => this.handleEditableChange(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="isEditable">Editable</label>
                </div>
                <button 
                    type="button"
                    disabled={!isValid}
                    onClick={this.modifyProduct}
                    className="btn btn-primary">Update</button>
            </form>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(EditProduct);