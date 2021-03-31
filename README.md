# SLO Generator UI

SLO Generator UI is a dashboard for viewing, editing and analyzing Service 
Level Objectives. It works in tandem with the `slo-generator` and requires the 
`Bigquery` exporter to be setup as it queries all data from BigQuery. 

SLO Generator UI is useful for both SRE teams and application teams to get a feel 
of where they're at in their SRE journey, SLO adoption and SLO targets.

## Requirements
* python 3.8
* npm

## Backend
SLO Generator UI backend is written in Flask (Python). It is a simple 
interfacing API layer to make queries to BigQuery.

### Setup
```
cp backend/.env.sample backend/.env
```
Set all the required environment variables in `backend/.env` file.

### Run backend
```
cd backend/
source .env
flask run
```

## Frontend
SLO Generator UI frontend is written in VueJS 3 for the UI framework, 
and Tailwind CSS for the HTML / CSS styling.

### Project setup

### Compiles and hot-reloads for development
```
cd frontend/
npm run serve
```

### Compiles and minifies for production
```
cd frontend/
npm run build
```
