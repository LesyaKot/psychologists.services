import { Link } from "react-router-dom";
import clsx from "clsx";
import css from './Button.module.css';

export default function Button({to, variant, children}){

    return(
        <Link to={to} className={clsx(css.btn, css[variant])}>
        {children}
      </Link>
    )
}