#!/bin/bash

DB_DATABASE_DASH="DASHBOARD"
DB_DATABASE_ADM="ADMINISTRATION"
DB_HOST="localhost"
DB_LOGIN="root"
DB_PASSWORD="root"
SEQUELIZE_CONFIG="./dist/scripts/sequelize.json"
SQL_SDL_ADM="../database/sdl/administration_database.sql"
SQL_SDL_APP="../database/sdl/application_database.sql"
SQL_SDL_DASH="../database/sdl/dashboard_database.sql"

apply_patch() {
  for file in src/models/patch/*.patch
  do
    path=$(basename "$file")
    filename="src/models/"${path%.*}".js"
    patch $filename < $file
  done
}

generate_models() {
  sequelize-auto -o "./src/models/$DB_DATABASE_DASH" -d $DB_DATABASE_DASH -h $DB_HOST -u $DB_LOGIN -x $DB_PASSWORD -a $SEQUELIZE_CONFIG
  sequelize-auto --help -o "./src/models/$DB_DATABASE_ADM" -d $DB_DATABASE_ADM -h $DB_HOST -u $DB_LOGIN -x $DB_PASSWORD --a $SEQUELIZE_CONFIG
}

clear_models() {
  rm -rf "./src/models"
  mkdir -p "./src/models/$DB_DATABASE_DASH"
  mkdir -p "./src/models/$DB_DATABASE_ADM"
}

init_database() {
  mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $SQL_SDL_ADM
  mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $SQL_SDL_APP
  mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $SQL_SDL_DASH
}

init_database
clear_models
generate_models
apply_patch
