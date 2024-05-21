import React from 'react';
import styles from './activityItem.module.scss';
import Image from "next/image";
import {BsThreeDotsVertical} from "react-icons/bs";

function ActivityItem({name, description, start, end, cost}: {name: string, description: string, start: string, end: string, cost: number}) {
    return (
        <div className={styles.container}>
            <Image src={"/activity.png"} alt={"Activity image"} width={200} height={200}/>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <p>Cost: ${cost}</p>
            </div>
            <div>
                <h2>Arrive at {start}</h2>
                <BsThreeDotsVertical/>
                <h2>Depart by {end}</h2>
            </div>
        </div>
    );
}

export default ActivityItem;