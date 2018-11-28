import React from "react";
import Map from "./components/Map";
import { GoogleApiWrapper } from "google-maps-react";

export class Container extends React.Component {
	render() {
		if (!this.props.loaded) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<Map google={this.props.google} />
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: `AIzaSyClP-Lxzkj750LSMWpDJprfl6m7xNcOFuQ`
})(Container);
