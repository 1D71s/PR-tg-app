import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd, onDelete, backet }) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    const onDeleteHandler = () => {
        onDelete(product);
    }

    const getCount = () => {
        const itemInBasket = backet.find(item => item.id === product.id);
        return itemInBasket ? itemInBasket.quantity : 0;
    }

    return (
        <div className={'product ' + className}>
            {getCount() < 1 && <div className={'counter'}>{getCount()}</div>}
            <img src={product.image} className={'img'}/>
            <div className={'title'}>{product.name}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span><b>{product.price}</b> грн</span>
            </div>
            <div className='btns-cont' >
                <Button className={'btn-item'} onClick={onAddHandler}>
                    {getCount() < 1 ? 'Додати в кошик' : '+'}
                </Button>
                {getCount() > 0 && <Button className={'btn-item btn-minus'} onClick={onDeleteHandler}>
                    -
                </Button>}
            </div>
        </div>
    )
}

export default ProductItem;
