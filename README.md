# Neighborhood Maps
### What is this?
This is a React based project which displays the info and locations of certain businesses within a specific neighborhood. In this case, I chose to show the various 'fine-dining' establishments (aka: dive bars) in downtown Kansas City, Mo.

### Resources
This project was built with the following tools:
* [Create React App](https://github.com/facebook/create-react-app).
* [React-Burger-Menu](https://github.com/negomi/react-burger-menu).
* [Google-Maps-React](https://github.com/fullstackreact/google-maps-react).
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial).
* [Foursquare Places API](https://developer.foursquare.com/places-api).

### Running the app
* Clone this repo by typing git clone `https://github.com/kylegeary/neighborhood-map.git` in your computer's terminal
* After cloning the repo, run `npm install`
* To see the app in action, run `npm start`

### But wait, there's more
You can run this app in development mode or production mode.
* To run in development mode - run `npm start`.
* To run in production mode - run `npm run build`. This will bundle the app in the `build` folder with optimizations for better performance.
* I am using the default create-react-app service worker in this project. The service worker only works in production mode. You can read about this here -> https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app