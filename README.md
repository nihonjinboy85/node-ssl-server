Steps to sending client certificate from Node.js to another server

1. Create a certificate key within server directory (e.g. openssl genrsa -out cert/key.pem)
2. Create a new certificate request within server directory (e.g. openssl req -new -key cert/key.pem -out cert/csr.pem)
3. Fill in certificate request details (country, state, city, etc.)
4. Create a new certificate using x509 standard (e.g. openssl x509 -req -days 365 -in cert/csr.pem -signkey cert/key.pem -out cert/cert.pem)
5. Combine certificate and key into .pfx (e.g. openssl pkcs12 -export -in cert/cert.pem -inkey cert/key.pem -out cert/cert.pfx)
6. Within Node.js app, create options variable of type object containing 'pfx' key and use fs.readFileSync to store 'cert.pfx' contentx as the value (e.g. const options = { pfx: fs.readFileSync(path.join(\_\_dirname, 'cert', 'cert.pfx'))})
7. Still within Node.js app, use built-in https module to send request to other server, using options variable as options argument in https.request method
