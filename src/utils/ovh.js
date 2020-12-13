export const ovh = require('ovh')({
    endpoint: 'ovh-eu',
    appKey: process.env.REACT_APP_APP_KEY,
    appSecret: process.env.REACT_APP_APP_SECRET,
    consumerKey: process.env.REACT_APP_CONSUMER_KEY
});