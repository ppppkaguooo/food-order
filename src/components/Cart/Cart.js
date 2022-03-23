import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `￥${cartCtx.totalAmount.toFixed(2)}`;


    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })

    }

    const orderHandler = () => {
        setIsCheckOut(true)

    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-food-order-708d7-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }



    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );


    const modalActions =( 
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>关闭</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>下单</button>}
    </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total} >
                <span>总价</span>
                <span>{totalAmount}</span>
            </div >
            {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckOut && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>订单生成中...</p>

    const didSubmitModalContent =(
    <React.Fragment> <p>您已成功下单！</p>
    <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>关闭</button>
       
    </div>
    </React.Fragment>
    );
   

    return (
        <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && cartModalContent }
           {isSubmitting && isSubmittingModalContent}
           {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>

    );
};

export default Cart;