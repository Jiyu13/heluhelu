// eslint-disable-next-line
import Chart from 'chart.js/auto'

import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import apiFetch from '../api/ApiFetch';

export function LineGraph() {

    const [readingStats, setReadingStats] = useState(null)

    const d = new Date()
    let current_month = d.getMonth() + 1  // 0 -11

    useEffect(() => {
        apiFetch(`/stats/month/${current_month}`)
        .then(res => res.json())
        .then(data => setReadingStats(data))
    }, [current_month])


    let labels = []
    for (let i = 30; i > 1; i--) {
        labels.push(`${i} Days Ago`)
    }
    labels.push("Yesterday")
    labels.push("Today")


    return (
        <Line 
            data={{
                // x-axis label values
                labels: labels,
                datasets: [
                    {
                        label: "Pages Read",
                        // y-axis data plotting values
                        data: readingStats?.map((words) => (words / 250).toFixed(2)),
                        fill: false,
                        borderWidth: 4,
                        borderColor: "#3498db",
                        responsive: true
                    }
                ]
            }}
        />
    )
}