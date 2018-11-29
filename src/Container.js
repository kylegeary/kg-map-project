import React from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";

export class Container extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
	};

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});

	onMapClick = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};
	render() {
		if (!this.props.loaded) {
			return <div>Loading...</div>;
		}
		const style = {
			width: "100vw",
			height: "100vh"
		};
		const bars = this.props.bars.map(bar => {
			return (
				<Marker
					onClick={this.onMarkerClick}
					title={bar.venue.name}
					position={{ lat: bar.venue.location.lat, lng: bar.venue.location.lng }}
					name={bar.venue.name}
					key={bar.venue.name}
					address={bar.venue.location.address}
					city={bar.venue.location.city}
				/>
			);
		});

		return (
			<Map
				item
				style={style}
				google={this.props.google}
				onClick={this.onMapClick}
				zoom={14}
				initialCenter={{
					lat: 39.092327,
					lng: -94.58433
				}}
			>
				{bars}
				<InfoWindow
					marker={this.state.activeMarker}
					key={this.state.selectedPlace.name}
					visible={this.state.showingInfoWindow}
				>
					<h1>{this.state.selectedPlace.name}</h1>
					<p>
						{this.state.selectedPlace.address} <br />
						{this.state.selectedPlace.city}
					</p>
				</InfoWindow>
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: `AIzaSyClP-Lxzkj750LSMWpDJprfl6m7xNcOFuQ`
})(Container);
