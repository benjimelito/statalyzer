#!/usr/local/bin/bash

TEAMS=( ['Clippers']="http://www.oddsshark.com/stats/gamelog/basketball/nba/20736" )
TEAM='Clippers'
curl --include --request POST localhost:3000/scrape \
  --header "Content-Type: application/json" \
  --data '{
    "url": "'"${TEAMS[$TEAM]}"'",
    "team": "LA Clippers"
  }'