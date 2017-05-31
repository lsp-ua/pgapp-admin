import React from 'react'
import {Panel} from 'react-bootstrap'

import GeoPoint from 'geopoint'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Rectangle,
  InfoWindow } from "react-google-maps";

const GoogleMapElement = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: props.venue.latitude, lng: props.venue.longitude }}
    onClick={props.onMapClick}
  >
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
              <p>{marker.status ? `Status: ${marker.status}` : ''}</p>
              <p>{marker.rating ? `Rating: ${marker.rating}` : ''}</p>
            </div>
          </InfoWindow>
          )}
      </Marker>
    ))}
    <Rectangle
      bounds={props.bounds}/>
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

  // componentWillReceiveProps(nextProps) {
  //   this.prepareMarkersData();
  // }

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
    let data = this.props.shiftProf && this.props.shiftProf.map((item) => {
      let icon = item.status === 'accepted' ? 'green-dot.png' : 'blue-dot.png';
      return {
        status: item.status,
        rating: item.rating,
        showInfo: false,
        icon: `http://maps.google.com/mapfiles/ms/icons/${icon}`,
        position: {
          lat: item.latitude,
          lng: item.longitude,
        },
        key: `${item.professional.firstname} ${item.professional.lastname}`,
        defaultAnimation: 2
      }
    });

    //Venue marker
    if (this.props.venue) {
      data.push({
        showInfo: false,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        position: {
          lat: this.props.venue.latitude,
          lng: this.props.venue.longitude,
        },
        key: this.props.venue.name,
        defaultAnimation: 2
      });
    }

    this.setState({
      markers: data
    });
  }

  prepareBounds() {
    const point = new GeoPoint(this.props.venue.latitude, this.props.venue.longitude);
    const [swPoint, nePoint] = point.boundingCoordinates(25, null, false);

    return {
      north: nePoint.latitude(),
      south: swPoint.latitude(),
      east: nePoint.longitude(),
      west: swPoint.longitude()
    };
  }

  render() {
    let { venue } = this.props;

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
          venue={venue}
          markers={this.state.markers || []}
          bounds={this.prepareBounds()}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </Panel>
    );
  }
}

