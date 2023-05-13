import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/HI-15-hawaii-counties.json"


export function HawaiianMap() {
    return (
        <div style={{"overflowY": "none"}}>
            <ComposableMap
                projection={"geoAlbers"}
                height={180}
                width={180}
                projectionConfig={{ 
                    center: [-93, -328.5], 
                    scale: 1000,
                    rotate: [93, 60.0, 0]
                }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} />
                    ))
                    }
                </Geographies>
            </ComposableMap>

    
    {/* <ComposableMap>

        <ZoomableGroup center={[-150, 0]} disablePanning>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        
        </ZoomableGroup>
    </ComposableMap> */}
    </div>
    )

}