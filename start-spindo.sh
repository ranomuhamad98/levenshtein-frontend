export GOOGLE_APPLICATION_CREDENTIALS=/Users/mhuda/Works/Credentials/lv-tennant-spindo-owner.json
gcloud config configurations activate lv-tennant-spindo
rm .env
cp .env-spindo .env
node app.js
