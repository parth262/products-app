import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

const fieldsToDisplay = ["name", "weight", "availability", "isEditable"];

function Products({products}) {
    return <table className="table products">
        <thead className="thead-dark">
            <tr>
                {fieldsToDisplay.map((field, i) => <th key={i}>{field.toUpperCase()}</th>)}
            </tr>
        </thead>
        <tbody>
            {products.map((product, i) => <Product key={i} fields={fieldsToDisplay} product={product}/>)}
        </tbody>
    </table>
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Products)