import React from "react";
import styles from "./spinner.module.css";

const Spinner = ({ size = 20, thickness = 5 }) => {
    return (
        <div className={styles.spinner} style={{ width: size, height: size, borderWidth: thickness }}></div>
    )
}

export default Spinner;