import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket, deleteFromBasket } from '../../store/reducers';
import Button from '../Button/Button';

export const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += Number(item.totalPrice)
    }, 0)
}

const test = [{ "id": 51, "name": "dgbdfgb", "image": "https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1704990678336.jpg", "description": "dfgbdfgb", "price": "4.00", "createdAt": "2024-01-11T16:31:20.364Z", "updatedAt": "2024-01-11T17:54:12.662Z" }, { "id": 53, "name": "trh", "image": "https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1704990732313.jpg", "description": "rth", "price": "444.00", "createdAt": "2024-01-11T16:32:13.994Z", "updatedAt": "2024-01-11T18:06:23.282Z" }, { "id": 48, "name": "fhnfghn", "image": "https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1704911728878.jpg", "description": "fhn", "price": "66666.00", "createdAt": "2024-01-10T18:35:32.774Z", "updatedAt": "2024-01-11T18:06:36.707Z" }, { "id": 52, "name": "fgb", "image": "https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1704990698910.jpg", "description": "fgb", "price": "77.00", "createdAt": "2024-01-11T16:31:40.554Z", "updatedAt": "2024-01-11T18:33:47.604Z" }, { "id": 55, "name": "yyy", "image": "https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1704998464291.jpg", "description": "ttt", "price": "66.00", "createdAt": "2024-01-11T18:41:05.786Z", "updatedAt": "2024-01-11T18:41:05.786Z" }]

const ProductList = () => {
    const [products, setProducts] = useState(test);
    const { tg, queryId } = useTelegram();
    const dispatch = useDispatch();
    const backet = useSelector(state => state.basket); 
    const [totalPriceBacket, setTotalPriceBacket] = useState() 

    const navigate = useNavigate();
  
    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
  
    }, [tg]);
  
    useEffect(() => {
        tg.onEvent('mainButtonClicked', () => navigate('/form'));
        return () => {
            tg.offEvent('mainButtonClicked', () => navigate('/form'));
        };
    }, [backet, tg]);
  
    const onAdd = (product) => {
        dispatch(addToBasket(product));  
    }

    const onDelete = (product) => {
        dispatch(deleteFromBasket(product));
        setTotalPriceBacket(getTotalPrice(backet))
    }

    useEffect(() => {
        setTotalPriceBacket(getTotalPrice(backet))

        if (backet.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Замовити: ${getTotalPrice(backet)} ГРН`
            });
        }  
    }, [backet])
  
    return (
        <>
            {!queryId && <Button onClick={() => navigate('/form')}>{totalPriceBacket} ГРН</Button>}
            <div className={'list'}>
                {products.map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                        onAdd={onAdd}
                        backet={backet}
                        onDelete={onDelete}
                        className={'item'}
                    />
                ))}
            </div>
        </>
    )
}
  
  export default ProductList;