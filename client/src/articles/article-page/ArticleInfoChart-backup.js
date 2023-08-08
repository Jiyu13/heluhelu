// import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
// // import ChartDataLabels from "chartjs-plugin-datalabels";
// // import "chart.js-plugin-labels-dv";


// // import react Doughnut component
// import { Doughnut } from 'react-chartjs-2'

// // register the compoments from import statement
// ChartJS.register(ArcElement, Tooltip, Legend)

// export function ArticleInfoChart(props) {
//     const { totalWords, totalKnowns, totalStudyings, totalIgnoreds, newWords } = props

//     // define data & options
//     const data = {
//         labels: ["New Words", 'Studying', 'Known'],
//         datasets: [{
//             label: '',
//             data: [
//                 newWords,
//                 totalStudyings?.length,
//                 totalKnowns?.length + totalIgnoreds?.length
//             ],
//             backgroundColor: [
//                 "rgb(112, 161, 255)", // unknown/new words
//                 "rgb(255, 221, 89)",  // studying
//                 'rgb(75, 166, 127)', // known + ignore
//             ],
//             hoverOffset: 4,
//         }]

        
//     }
//     const options = {
//         plugins: {
//             legend: {display: false},
//         }
//     }

//     return (
//         <Doughnut
//             data={data}
//             options={options}
//         />
//     )
// }