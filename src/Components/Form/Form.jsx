import React, { useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket, deleteFromBasket } from '../../store/reducers';
import { getTotalPrice } from '../ProductList/ProductList';

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [isAddressVisible, setAddressVisible] = useState(false);

    const { tg, user } = useTelegram();

    const basket = useSelector(state => state.basket);

    const dispatch = useDispatch();

    useEffect(() => {
        tg.MainButton.hide();
    }, [])

    const onAdd = (product) => {
        dispatch(addToBasket(product));
    }

    const onDelete = (product) => {
        dispatch(deleteFromBasket(product));
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value.replace(/\D/g, ''));
    }

    const onChangeTime = (e) => {
        setTime(e.target.value)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const onCheckboxChange = () => {
        setAddressVisible(!isAddressVisible);
        if (!isAddressVisible) {
            setAddress('');
        }
    }

    const onSubmitOrder = () => {
        if (name && phone && time && (isAddressVisible ? address : true) && basket.length > 0) {
            const orderData = {
                name,
                phone,
                time,
                address: isAddressVisible ? address : null,
                basket,
                user,
            };
    
            // Отправка данных на сервер
            fetch('http://localhost:8000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Order Submitted Successfully:', data);
            })
            .catch(error => {
                console.error('Error submitting order:', error);
            });
        } else {
            console.error('Order submission failed. Please fill in all required fields and add items to the basket.');
        }
    }
    

    return (
        <div className={"form"}>
            <h4 className='hd'>Данні для доставки:</h4>
            {
                basket.map((item) =>
                    <div className='cont-product-backet'>
                        <div className='cont-img-name-b'>
                            <img className='img-product-backet' src={item.image} alt="" />
                            <div className='name-product-backet'>{item.name}</div>
                        </div>
                        <div className='cont-price-count-b'>
                            <div className='price-product-backet'>{item.totalPrice} ГРН</div>
                            <div className='count-product-backet'>{item.quantity} шт.</div>
                            <div className='btns-cont' >
                                <Button className={'btn-item'} onClick={() => onAdd(item)}>
                                    +
                                </Button>
                                <Button className={'btn-item btn-minus'} onClick={() => onDelete(item)}>
                                    -
                                </Button>
                            </div>
                        </div>
                    </div>)
            }
            <label className={'label'} htmlFor="nameInput">
                Ім'я
                <input
                    id="nameInput"
                    className={'input'}
                    type="text"
                    placeholder={"Ваше ім'я"}
                    value={name}
                    onChange={onChangeName}
                />
            </label>
            <label className={'label'} htmlFor="phoneInput">
                Телефон
                <input
                    id="phoneInput"
                    className={'input'}
                    type="text"
                    placeholder={'Ваш телефон'}
                    value={phone}
                    onChange={onChangePhone}
                />
            </label>
            <label className={'label'} htmlFor="timeInput">
                Час
                <input
                    id="timeInput"
                    className={'input'}
                    type="text"
                    placeholder={'Напишіть час'}
                    value={time}
                    onChange={onChangeTime}
                />
            </label>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="addressCheckbox"
                    checked={isAddressVisible}
                    onChange={onCheckboxChange}
                />
                <label htmlFor="addressCheckbox" className="checkbox-label">
                    Доставка
                </label>
            </div>
            {isAddressVisible && (
                <label className={'label'} htmlFor="addressInput">
                    Адреса
                    <input
                        id="addressInput"
                        className={'input'}
                        type="text"
                        placeholder={'Ваша адреса'}
                        value={address}
                        onChange={onChangeAddress}
                    />
                </label>
            )}
            <h4 className='price-order'>{getTotalPrice(basket)} ГРН</h4>
            <Button className='btn-order' onClick={onSubmitOrder}>
                Замовити
            </Button>
        </div>
    )
}

export default Form;
