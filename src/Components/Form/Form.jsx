import React, {useEffect, useState} from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket, deleteFromBasket } from '../../store/reducers';
import { getTotalPrice } from '../ProductList/ProductList';

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    
    const {tg} = useTelegram();

    const backet = useSelector(state => state.basket); 

    const dispatch = useDispatch();

    const getCount = (product) => {
        const itemInBasket = backet.find(item => item.id === product.id);
        return itemInBasket ? itemInBasket.quantity : 0;
    }

    useEffect(() => {
        tg.MainButton.hide();
    }, [])

    const onAdd = (product) => {
        dispatch(addToBasket(product)); 
    }

    const onDelete = (product) => {
        dispatch(deleteFromBasket(product));
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    return (
        <div className={"form"}>
            <h4 className='hd'>Данні для доставки:</h4>
            {
                backet.map((item) =>
                    <div className='cont-product-backet'>
                        <div className='cont-img-name-b'>
                            <img className='img-product-backet' src={item.image} alt="" />
                            <div className='name-product-backet'>{item.name}</div>
                        </div>
                        <div className='cont-price-count-b'>
                            <div className='price-product-backet'>{item.totalPrice} ГРН</div>
                            <div className='count-product-backet'>{item.quantity} шт.</div>
                            {/* <div className='btns-cont' >
                                <Button className={'btn-item'} onClick={() => onAdd(item)}>
                                    {() => getCount(item) < 1 ? 'Додати в кошик' : '+'}
                                </Button>
                                {() => getCount(item) > 0 && <Button className={'btn-item btn-minus'} onClick={() => onDelete(item)}>
                                    -
                                </Button>}
                            </div> */}
                        </div>
                    </div>)
            }
            <input
                className={'input'}
                type="text"
                placeholder={"Ім'я"}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Телефон'}
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Час'}
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Адреса'}
                value={street}
                onChange={onChangeStreet}
            />
            <h4 className='price-order'>{getTotalPrice(backet)} ГРН</h4>
            <Button className='btn-order'>Замовити</Button>
        </div>
    )
}

export default Form;