import React from "react";
import Container from "./Container";
import axios from "axios";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bars: [],
			barsFound: []
		};
	}
	showSettings(e) {
		e.preventDefault();
	}
	componentDidMount() {
		this.apiSearch();
	}

	//Fetches the desired location data using axios (see axios on NPM for more details)
	apiSearch = () => {
		const url = "https://api.foursquare.com/v2/venues/explore?";
		const parameters = {
			client_id: "YJLQ001IOFDL3GA0OY1NSJPOY4QTZHHL4E2BU3P1VOW1ERG2",
			client_secret: "NPH350MPAD5K3XBFR4EGLIZDT41O4RTOS5FPICW4HUJY2IL2",
			query: "dive bar",
			near: "Kansas City",
			limit: "6",
			v: "20180323"
		};
		axios
			.get(url + new URLSearchParams(parameters))
			.then(response => {
				this.setState({
					bars: response.data.response.groups[0].items,
					barsFound: response.data.response.groups[0].items
				});
			})
			.catch(e => {
				console.error(e);
			});
	};
	findBars = search => {
		if (!search) {
			this.setState({ barsFound: [] });
		}
		const foundBars = this.state.bars.filter(bar => bar.venue.name.toLowerCase().includes(search.toLowerCase()));
		this.setState({ barsFound: foundBars });
	};
	render() {
		return (
			<main className="App">
				<header className="top-nav">
					<h1 className="top-nav__title">KC Dive Bars</h1>
				</header>
				<Container bars={this.state.barsFound} findBars={this.findBars} />
			</main>
		);
	}
}

export default App;
