import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css'

const Header = (props) => {
    return (<Fragment>
        <header className={classes.header}>
            <h1>饿美了外卖平台</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="一桌好吃的" />
        </div>

    </Fragment>
    );
};
export default Header
