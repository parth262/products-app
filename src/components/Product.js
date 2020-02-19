import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({product, fields}) {
    return <tr>
        {fields.map((field, i) => {
            if(field==='isEditable') {
                return <td key={i}>
                    {product[field] && <Link className="btn btn-primary" to={`/edit-product/${product.id}`}>Edit</Link>}</td>
            } else {
                return <td key={i}>{product[field]}</td>
            }
        })}
    </tr>
}