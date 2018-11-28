import React from "react";
import ReactDOM from "react-dom";

class Map extends React.Component {
	constructor(props) {
		super(props);

		const { lat, lng } = this.props.initialCenter;
		this.state = {
			currentLocation: {
				lat: lat,
				lng: lng
			}
		};
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
			this.loadMap();
		}
	}
	componentDidMount() {
		this.loadMap();
	}

	loadMap() {
		if (this.props && this.props.google) {
			// google is available
			const { google } = this.props;
			const maps = google.maps;

			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef);

			let { initialCenter, zoom } = this.props;
			const { lat, lng } = initialCenter;
			const center = new maps.LatLng(lat, lng);
			const mapConfig = Object.assign(
				{},
				{
					center: center,
					zoom: zoom
				}
			);
			this.map = new maps.Map(node, mapConfig);
		}
	}
	render() {
		const style = {
			width: "100vw",
			height: "100vh"
		};
		return (
			<div style={style} ref="map">
				Loading map...
			</div>
		);
	}
}
Map.propTypes = {
	google: React.PropTypes.object,
	zoom: React.PropTypes.number,
	initialCenter: React.PropTypes.object
};
Map.defaultProps = {
	zoom: 14,
	// Downtown Kansas City will be the default center for the map (given the amount of bars there)
	initialCenter: {
		lat: 39.092327,
		lng: -94.58433
	}
};
export default Map;
