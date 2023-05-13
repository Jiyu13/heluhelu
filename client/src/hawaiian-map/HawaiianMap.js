import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/HI-15-hawaii-counties.json"


export function HawaiianMap() {
    return (
        <ComposableMap
            projection={"geoAlbers"}
            height={325}
            width={320}
            projectionConfig={{ 
                center: [-59, -342], 
                scale: 1500,
                // rotate: [-10.0, -53.0, 0]
            }}
            
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ComposableMap>

    
    // <ComposableMap>

    //     <ZoomableGroup center={[-150, -150]} disablePanning>
    //         <Geographies geography={geoUrl}>
    //         {({ geographies }) =>
    //           geographies.map((geo) => (
    //             <Geography key={geo.rsmKey} geography={geo} />
    //           ))
    //         }
    //       </Geographies>
        
    //     </ZoomableGroup>
    // </ComposableMap>
      )
}