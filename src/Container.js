import React from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";
import { slide as Menu } from "react-burger-menu";
import Sidebar from "./components/Sidebar";
import "./App.css";

export class Container extends React.Component {
	constructor(props) {
		super(props);
		this.onLocationEvent = this.onLocationEvent.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		menuOpen: false
	};

	handleStateChange(state) {
		this.setState({ menuOpen: state.isOpen });
	}
	closeMenu() {
		this.setState({ menuOpen: false });
	}
	toggleMenu() {
		this.setState({ menuOpen: true });
	}

	//fires when a click eventoccurs
	onLocationEvent = (props, marker) => {
		const bar = this.props.bars.filter(bar => bar.venue.name === props.title);
		this.setState({
			selectedPlace: bar[0],
			activeMarker: marker,
			showingInfoWindow: true
		});
	};

	render() {
		if (!this.props.loaded) {
			return <div>Loading...</div>;
		}
		const bars = this.props.bars.map(bar => {
			return (
				<Marker
					onClick={this.onLocationEvent}
					title={bar.venue.name}
					position={{ lat: bar.venue.location.lat, lng: bar.venue.location.lng }}
					name={bar.venue.name}
					key={bar.venue.name}
					address={bar.venue.location.address}
					state={bar.venue.location.address.state}
					city={bar.venue.location.city}
				/>
			);
		});

		return (
			<React.Fragment>
				<div className="menu-toggle" tabIndex="-1" onFocus={this.toggleMenu} onBlur={this.closeMenu}>
					<Menu
						bars={this.props.bars}
						isOpen={this.state.menuOpen}
						onStateChange={state => this.handleStateChange(state)}
					>
						<section className="side-nav">
							<h1 className="side-nav__title">Available Bars</h1>
							<div className="side-nav__line"> </div>
							<input
								className="side-nav__search"
								placeholder="Filter bars"
								onChange={event => {
									this.props.findBars(event.target.value);
									this.setState({ showingInfoWindow: false });
								}}
							/>
							<Sidebar bars={this.props.bars} />
						</section>
					</Menu>
				</div>
				<Map
					item
					google={this.props.google}
					zoom={12}
					initialCenter={{
						lat: 39.092327,
						lng: -94.58433
					}}
				>
					{bars}
					<InfoWindow
						className="infoWindow"
						marker={this.state.activeMarker}
						key={this.state.selectedPlace.name}
						visible={this.state.showingInfoWindow}
					>
						<h1 className="infoWindow__title">{this.state.activeMarker.name}</h1>
						<p className="infoWindow__body">
							{this.state.activeMarker.address}, {this.state.activeMarker.city}
						</p>
					</InfoWindow>
				</Map>
			</React.Fragment>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: `AIzaSyClP-Lxzkj750LSMWpDJprfl6m7xNcOFuQ`
})(Container);
