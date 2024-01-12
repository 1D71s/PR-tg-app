import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { user, onClose } = useTelegram();
    
    const navigate = useNavigate();

    return (
        <div className={'header'}>
            <Button className='btn-minus' onClick={() => navigate('/')}>Меню</Button>
            <Button onClick={onClose}>Створити піцу</Button>
        </div>
    )
}

export default Header;