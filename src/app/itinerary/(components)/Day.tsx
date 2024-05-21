import React from 'react';
import styles from './day.module.scss';
import ActivityItem from "@/app/itinerary/(components)/ActivityItem";
import TransitItem from "@/app/itinerary/(components)/TransitItem";
import {Activity} from "@/api/getItinerary";

function Day({date, activities}: { date: string, activities: Activity[] }) {
    return (
        <div className={styles.container}>
            <h1>Date: {date}</h1>
            {
                activities.map((activity, i) => (
                    activity.activity.includes("Walking") || activity.activity.includes("Subway") || activity.activity.includes("Ferry") || activity.activity.includes("Metromover") || activity.activity.includes("Drive") || activity.activity.includes("Car") || activity.activity.includes("Transit") || activity.activity.includes("Walk") || activity.activity.includes("Taxi") || activity.activity.includes("Bus") || activity.activity.includes("Light Rail")|| activity.activity.includes("Uber") ? (
                        <TransitItem key={i}
                                     name={activity.activity}
                                     description={activity.description}
                                     start={activity.startTime}
                                     end={activity.endTime}
                                     cost={activity.cost}
                        />
                    ) : (
                        <ActivityItem key={i}
                                      name={activity.activity}
                                      description={activity.description}
                                      start={activity.startTime}
                                      end={activity.endTime}
                                      cost={activity.cost}
                        />
                    )
                ))
            }
        </div>
    );
}

export default Day;