import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DoughnutChartLegend } from './DoughnutChartLegend';
import styled from 'styled-components';


export function DoughnutRecharts(props) {
    const { totalWords, totalStudyings, totalKnowns, totalIgnoreds, 
            totalUnique, studyingUnique, knownUnique, ignoredUnique,
            totalNew, newUnique, 
    } = props

    const data = [
        { value: totalNew, name: "New Words"},
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
        <GridContainer>
              <DoughnutChartLegend 
                payload={payload}
                totalKnowns={totalKnowns}
                knownUnique={knownUnique} 
                totalIgnoreds={totalIgnoreds} 
                ignoredUnique={ignoredUnique}
                studyingUnique={studyingUnique}
                newUnique={newUnique}
              />

        </GridContainer>
        
      )
    }


    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={250}>
          <Pie
            cx="50%"
            cy="80%"
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={68}
            outerRadius={125}
            fill="#8884d8"
            dataKey="value"
            startAngle={0}
            endAngle={180}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <text 
            x='50%' 
            y='50%'
            textAnchor="middle"  // horizontal alignment of the text to the middle, ensure the text os centered along its x-axis
            dominantBaseline="middle" // ensure the text is centered along its y-axis. In SVG, it determines the vertical alignment of the text
            style={{ fontSize: "1.2rem", fontWeight: 'bold', fill: '#777'}}
          >
            Total {totalWords?.length}
          </text>
          <text
              x='50%'
              y='65%'
              style={{ fontSize: "1rem", fontWeight: 'bold', fill: '#777' }}
              width={200}
              scaleToFit={true}
              textAnchor='middle'
          >
              (Unique {totalUnique?.length})
            </text>
          <Legend
            layout="vertical"
            verticalAlign='bottom'
            content={renderLegend}
            wrapperStyle={{color: "#000"}}
          />
          
        </PieChart>
      </ResponsiveContainer>
    );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-areas: "new studying known";
  gap: 10px;
  align-items: center;
`