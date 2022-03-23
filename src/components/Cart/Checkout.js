import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isElevenChars = value => value.trim().length === 11;



const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        phone: true,
        city: true,
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const phoneInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredCity = cityInputRef.current.value;


        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPhoneIsValid = isElevenChars(enteredPhone);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            phone: enteredPhoneIsValid,
        })

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPhoneIsValid;

        if (!formIsValid) {
            return // 提交data
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            phone: enteredPhone,
        })
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid
        }`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid
        }`;
    const phoneControlClasses = `${classes.control} ${formInputsValidity.phone ? '' : classes.invalid
        }`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid
        }`;
    //   返回一个表单
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>收货人</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>收货人不能为空！</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>收货地址</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>地址不能为空！</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor='phone'>手机号</label>
                <input type='text' id='phone' ref={phoneInputRef} />
                {!formInputsValidity.phone && <p>请输入有效的手机号！</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>城市</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>城市不能为空！</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    取消
                </button>
                <button className={classes.submit}>确认</button>
            </div>
        </form>
    );
};

export default Checkout;