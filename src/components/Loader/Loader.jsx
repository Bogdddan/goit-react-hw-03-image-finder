import React , { Component } from "react";
import { Audio } from "react-loader-spinner";
import css from './Loader.module.css'

export class Loader extends Component {
    render() {
        return (
            <Audio
            className={css.Loader}
            height={80}
            width={80}
            color="red"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
            />
        );
    }
}