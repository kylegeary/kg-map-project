import React from "react";

class Sidebar extends React.Component {
	updateCurrentMarker = marker => {
		document.querySelector(`[title="${marker}"]`).click();
	};
	render() {
		return (
			<section className="side-nav" bars={this.props.bars}>
				<ul bars={this.props.bars}>
					{this.props.bars.map((bar, index) => {
						return (
							<li
								className="side-nav__locations"
								tabIndex="0"
								role="button"
								aria-label="bar listings"
								key={index}
								onClick={() => this.updateCurrentMarker(bar.venue.name)}
							>
								{bar.venue.name}
							</li>
						);
					})}
				</ul>
			</section>
		);
	}
}
export default Sidebar;
