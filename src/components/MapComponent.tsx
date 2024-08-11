import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { CovidDataItem } from "../types/types";
import { LatLngExpression } from "leaflet";


interface MapComponentProps {
    data: CovidDataItem[];
    selectedState: string | undefined;
    onMarkerClick?: (data: any) => void;
    center?: [number, number];
    zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ data, selectedState = 'Total', onMarkerClick, center = [20.593683, 78.962883], zoom = 5 }) => {
    const filteredData = selectedState === 'Total' ? data.slice(1) : data.filter(state => state.State === selectedState);
    console.log('filtered states', filteredData)
    const lookAtCenter = selectedState !== 'Total' ? [filteredData[0]?.Latitude, filteredData[0]?.Longitude] as LatLngExpression : center;
    return (<div id='map'>
        <MapContainer center={lookAtCenter} zoom={zoom} scrollWheelZoom={false} style={{
            maxWidth: '1200px', height: '100%',
        }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
            />
            {filteredData.map((states) => {
                return <Marker
                    key={states.State_code}
                    position={[states.Latitude, states.Longitude]}
                    eventHandlers={{
                        click: () => {
                            console.log(states.State)
                        }
                    }}
                >
                    <Popup>
                        <h3>{states.State}</h3>
                        <p><strong>Total Cases:</strong> {states.Confirmed}</p>
                        <p><strong>Active Cases:</strong> {states.Active}</p>
                        <p><strong>Recovered Cases:</strong> {states.Recovered}</p>
                        <p><strong>Deaths:</strong> {states.Deaths}</p>
                    </Popup>
                </Marker>
            })
            }
        </MapContainer>
    </div>)
}

export default MapComponent;