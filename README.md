# Lovas nyilvántartó webalkalmazás

## Szükséges keretrendszerek

 - Node Js
 - Mongo DB
 - Angular (cli 13.0.0)

## Függőségek telepítése
 - gyökér mappa (ahol a server.js van): `npm install`
 - horseApp: `npm install`, `npm i @angular/cli@13.3.8`

## Futtatás
 - Mongo DB: `mongod --port 27017 --dbpath C:/MongoDB/data/db` (mongod.exe mappája)
 - Node JS backend API: `node server.js` (gyökér mappa)
 - Angular: `ng serve` (horseApp mappa)