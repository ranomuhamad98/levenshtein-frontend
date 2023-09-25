gcloud config configurations activate lvsaas
rm .env
cp .env-spindo .env
node app.js
