import React from 'react'
import {Panel} from 'react-bootstrap'

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow } from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

const GoogleMapElement = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={props.markers[0].position}
    onClick={props.onMapClick}
  >

    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >

    </MarkerClusterer>

    {props.markers && props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}
        onRightClick={() => props.onMarkerRightClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>
              <p><strong>{marker.key}</strong></p>
              <p>{marker.triggerType ? `Trigger Type: ${marker.triggerType}` : ''}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}

  </GoogleMap>
));

export default class MapElement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: []
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  componentDidMount() {
    this.prepareMarkersData();
  }

  componentWillReceiveProps(nextProps) {
    this.prepareMarkersData();
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    console.log('handleMapClick');
  }

  handleMarkerRightClick(targetMarker) {
    console.log(targetMarker);
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }

        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }

        return marker;
      }),
    });
  }

  prepareMarkersData() {
    //Professionals marker
    let data = this.props.markersData && this.props.markersData.map((item) => {
      let icon = item.trigger_type === 'time' ? 'green-dot.png' : 'blue-dot.png';
      return {
        showInfo: false,
        triggerType: item.trigger_type,
        icon: `http://maps.google.com/mapfiles/ms/icons/${icon}`,
        position: {
          lat: item.latitude,
          lng: item.longitude,
        },
        key: item.timestamp,
        defaultAnimation: 2
      }
    });

    this.setState({
      markers: data
    });
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header='Map'>
        <GoogleMapElement
          containerElement={
            <div style={{ height: '450px', width: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers || []}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </Panel>
    );
  }
}

