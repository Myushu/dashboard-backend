#!/bin/bash

DB_DATABASE_DASH="DASHBOARD"
DB_DATABASE_ADM="ADMINISTRATION"
DB_HOST="localhost"
DB_LOGIN="root"
DB_PASSWORD="&f0q\$6ne"
SEQUELIZE_CONFIG="./dist/scripts/sequelize.json"

SQL_FOLDER="../../database/"
SQL_DDL=$SQL_FOLDER"ddl/"
SQL_SDL=$SQL_FOLDER"sdl/"
SQL_SDL_ADM=$SQL_SDL"administration_database.sql"
SQL_SDL_APP=$SQL_SDL"application_database.sql"
SQL_SDL_DASH=$SQL_SDL"dashboard_database.sql"

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
  echo "========== running: "$SQL_SDL_ADM" =========="
  mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $SQL_SDL_ADM
  echo "========== running: "$SQL_SDL_APP" =========="
  mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $SQL_SDL_APP
  echo "========== running: "$SQL_SDL_DASH" =========="
  mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $SQL_SDL_DASH
}

create_default_data() {
  for file in $SQL_DDL/*sql
  do
    echo "========== running: "$file" =========="
    mysql -h $DB_HOST -u $DB_LOGIN -p$DB_PASSWORD < $file
  done
}

init_database
create_default_data
clear_models
generate_models
# apply_patch
