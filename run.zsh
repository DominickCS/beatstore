#!/bin/zsh

docker compose up -d
cd backend
export $(cat ../.env | xargs) && mvn spring-boot:run &
cd ../frontend
npm run dev
