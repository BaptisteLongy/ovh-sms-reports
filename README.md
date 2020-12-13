# Rapports SMS OVH

This project aims to deliver web-based reports on your OVH SMS comsuption. It has been created to easily track the credit consumption over a period of time, as the information is not easily accessible in the OVH dashboard.

# Installation
* `git clone` this repository
* follow the intructions inside the `.env` file
  * copy/paste the `.env` file and rename it `.env.local`
  * change the values of `REACT_APP_APP_KEY`, `REACT_APP_APP_SECRET` and `REACT_APP_CONSUMER_KEY` according to your project (refer to the [OVH documentation for more info](https://docs.ovh.com/gb/en/customer/first-steps-with-ovh-api/#creating-identifiers))

# Launch
* open a command console in the cloned repository
* run `npm start`
* go to [http://localhost:3000](http://localhost:3000)