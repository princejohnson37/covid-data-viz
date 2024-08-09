import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { CovidData } from "../types/types";

interface MapComponentProps {
    data: CovidData[];
    onMarkerClick?: (data: CovidData) => void;
    center?: [number, number];
    zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({data, onMarkerClick, center, zoom =  5}) => {

    return (<div id='map'>
        <MapContainer center={[20.593683, 78.962883]} zoom={zoom} scrollWheelZoom={false} style={{ width: "50vw", height: "100vh" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
            />
            {data.map(states => (
                <Marker
                    key={states.Id}
                    position={[states.Latitude, states.Longitude]}
                    eventHandlers={{
                        click: () => {
                            // setActiveCovid(states)
                        }
                    }}
                />
            ))}

        </MapContainer>
    </div>)
}

export default MapComponent;