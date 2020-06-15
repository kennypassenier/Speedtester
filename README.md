# Speedtester

NodeJS app that uses speedtest.net to measure your network speed. 
When the speed (in MB/s) is below the threshold, it will send an email.

Create a credentials.js file and fill it with the correct info

ex:

const user = 'user@gmail.com';
const password = 'password';
const to = "recipient@gmail.com"

module.exports = { user, password, to }
