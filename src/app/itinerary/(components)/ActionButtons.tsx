import React from 'react';
import styles from "@/app/itinerary/(components)/actionButtons.module.scss";
import Link from "next/link";

function ActionButtons() {
    return (
        <div className={styles.container}>
            <Link href={"/home"} passHref={true} legacyBehavior={true}>
                <button className={styles.cancel}>Home</button>
            </Link>
        </div>
    );
}

export default ActionButtons;