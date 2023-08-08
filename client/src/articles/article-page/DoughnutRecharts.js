import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';


export function DoughnutRecharts(props) {
    const { totalWords, totalKnowns, totalStudyings, totalIgnoreds, newWords, newUnique,
            uniqueWords, studyingUnique, knownUnique, ignoredUnique,
    } = props
    
    const data = [
        { value: newWords, name: "New Words"},
        { value: totalStudyings?.length, name: "Studying"},
        { value: totalKnowns?.length + totalIgnoreds?.length, name: "Known + Ignored", },
    ]
    const COLORS = ["rgb(112, 161, 255)", "rgb(243, 170, 96)", 'rgb(75, 166, 127)' ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value,percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
          <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
          {`${(value / totalWords?.length * 100).toFixed(0)}%`}
          </text>
      );
    };

    // Tooltip when hover on pie section
    const customTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
            <div
                className="custom-tooltip"
                style={{
                    backgroundColor: "#ffff",
                    padding: "5px",
                    border: "1px solid #cccc"
                }}
            >
                <label>{`${payload[0].name}: ${payload[0].value}`}</label>
            </div>
            );
        }
    }

    // custome Legen payload
    const renderLegend = (props) => {
      const {payload} = props
      return (
        <ul>
          {
            payload.map((entry, index) => {
              return (
                <li
                  key={`item-${index}`}
                  style={{
                    fontWeight: "bold",
                    color:`${entry.color}`,
                    marginBottom: "8px"
                  }}
                >
                  { entry.value === "Known + Ignored" && (
                    `Known: ${totalKnowns?.length} (${knownUnique?.length}), Ignored: ${totalIgnoreds?.length} (${ignoredUnique?.length})`)
                  }
                  { entry.value === "Studying" && (
                    `${entry.value}: ${entry.payload.value} (${studyingUnique?.length})`
                  )}
                  { entry.value === "New Words" && (
                    `New: ${entry.payload.value} (${newUnique})`
                  )}
                </li>
              )
            })
          }
        </ul>
      )

    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={75}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <text 
            // x, y, to 50%, center the text horizontally & vertically
            x='50%' 
            y='32%'
            scaleToFit={true}
            textAnchor="middle"  // horizontal alignment of the text to the middle, ensure the text os centered along its x-axis
            dominantBaseline="middle" // ensure the text is centered along its y-axis. In SVG, it determines the vertical alignment of the text
            verticalAnchor='middle'
            style={{ fontSize: "1.2rem", fontWeight: 'bold', fill: '#777'}}
          >
            Total {totalWords?.length}
          </text>
          <text
              x='50%'
              y='41%'
              style={{ fontSize: "1rem", fontWeight: 'bold', fill: '#777' }}
              width={200}
              scaleToFit={true}
              textAnchor='middle'
              verticalAnchor='middle'
          >
              (Unique {uniqueWords?.length})
            </text>
          <Legend
            wrapperStyle={{fontSize: "0.9rem"}}
            layout="vertical"
            verticalAlign='bottom'
            content={renderLegend}
            // payload={[
            //   { value: `New Words: ${newWords} (${newUnique})`, type: 'square', color: "rgb(112, 161, 255)" },
            //   { 
            //     value: `Studying: ${totalStudyings?.length} (${studyingUnique?.length})`, 
            //     type: 'square', 
            //     color: "rgb(255, 221, 89)",
            //     style: {marginTop: "8px"}
            //   },
            //   { value: `Known: ${totalKnowns?.length} (${knownUnique?.length}) + 
            //            Ignored: ${totalIgnoreds?.length} (${ignoredUnique?.length})`, 
            //     type: 'square', 
            //     color: 'rgb(75, 166, 127)' 
            //   },
            // ]}
          />
          
        </PieChart>
      </ResponsiveContainer>
    );
}