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

const test = [
    {
        id: 56,
        name: '4 сири',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705084045049.jpg',
        description: 'вершкова основа, моцарела, дор блю, вершковий сир, пармезан',
        price: '165.00',
        createdAt: '2024-01-12T18:27:35.497Z',
        updatedAt: '2024-01-12T18:27:35.497Z'
    },
    {
        id: 57,
        name: 'Мʼясна',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705084713163.jpg',
        description: 'томатна основа, сир моцарела, куряче філе, шинка і бекон',
        price: '155.00',
        createdAt: '2024-01-12T18:38:41.841Z',
        updatedAt: '2024-01-12T18:38:41.841Z'
    },
    {
        id: 58,
        name: 'Техас',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705085988215.jpg',
        description: 'вершкова основа, сир моцарела, мисливські ковбаски, помідор, гриби, кукурудза.',
        price: '160.00',
        createdAt: '2024-01-12T18:59:52.935Z',
        updatedAt: '2024-01-12T18:59:52.935Z'
    },
    {
        id: 60,
        name: 'Груша дор блю',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705086305627.jpg',
        description: 'вершкова основа, сир моцарела, груша, дор блю, горішки.',
        price: '165.00',
        createdAt: '2024-01-12T19:05:08.887Z',
        updatedAt: '2024-01-12T19:05:08.887Z'
    },
    {
        id: 61,
        name: 'Піца Папероні',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705086379388.jpg',
        description: 'червона основа із томатів пелаті, сир моцарела, ковбаса папероні і болгарський перець.',
        price: '150.00',
        createdAt: '2024-01-12T19:06:22.233Z',
        updatedAt: '2024-01-12T19:06:22.233Z'
    },
    {
        id: 62,
        name: 'Тальянська піца',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705086426127.jpg',
        description: 'Вершки, сир моцарела, куряче філе, шинка, шампіньйони і корнішони.',
        price: '160.00',
        createdAt: '2024-01-12T19:07:10.030Z',
        updatedAt: '2024-01-12T19:07:10.030Z'
    },
    {
        id: 63,
        name: 'Карбонара',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705086463080.jpg',
        description: 'Вершки, сир моцарела, бекон, пармезан і рукола.',
        price: '150.00',
        createdAt: '2024-01-12T19:07:47.990Z',
        updatedAt: '2024-01-12T19:07:47.990Z'
    },
    {
        id: 64,
        name: 'Баварська',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705086541481.jpg',
        description: 'соус із томатів пелаті, сир моцарела, ковбаса папероні, мисливські ковбаски, помідор, цибуля.',
        price: '160.00',
        createdAt: '2024-01-12T19:09:05.348Z',
        updatedAt: '2024-01-12T19:09:05.348Z'
    },
    {
        id: 65,
        name: 'Гавайська піца',
        image: 'https://pr-tg-bot.s3.eu-north-1.amazonaws.com/image_1705086578652.jpg',
        description: 'соус із томатів пелаті, сир моцарела, куряче філе, шинка, кукурудза та ананаси.',
        price: '155.00',
        createdAt: '2024-01-12T19:09:39.890Z',
        updatedAt: '2024-01-12T19:09:39.890Z'
    }
]
  
  
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