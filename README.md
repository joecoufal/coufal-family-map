# Coufal Family Historical Map

An interactive map showing historical locations and stories of the Coufal family.

## Setup

1. Clone this repository
2. Copy `config.js.example` to `config.js`
3. Get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com)
4. Add your API key to `config.js`
5. Open `index.html` in your browser

## Configuration

The map requires two configuration values in `config.js`:
- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `GOOGLE_MAPS_MAP_ID`: Your Google Maps Map ID (if using custom styling)

Never commit the actual `config.js` file to the repository as it contains sensitive API keys.