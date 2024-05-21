import React from 'react';
import styles from './activityItem.module.scss';
import Image from "next/image";
import {BsThreeDotsVertical} from "react-icons/bs";

function ActivityItem({name, description, start, end, cost}: {name: string, description: string, start: string, end: string, cost: number}) {
    return (
        <div className={styles.container}>
            <Image src={"/location.png"} alt={"Activity image"} width={150} height={150}  style={{marginRight: "50px"}}/>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <p>Cost: ${cost}</p>
            </div>
            <div>
                <h2>Transit at {start}</h2>
                <BsThreeDotsVertical/>
                <h2>Arrive at {end}</h2>
            </div>
        </div>
    );
}

export default ActivityItem;