const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // ... other configurations ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.EMAILJS_PUBLIC_KEY': JSON.stringify(process.env.EMAILJS_PUBLIC_KEY),
      'process.env.GOOGLE_ANALYTICS_KEY': JSON.stringify(process.env.GOOGLE_ANALYTICS_KEY)
    })
  ]
};

