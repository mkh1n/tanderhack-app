#!/bin/bash
set -ex

out=$(docker pull mkh1n/tanderhack)

if [[ $out != *"up to date"* ]]; then
   cd /home/hacker/tanderhack
   docker compose down
   docker compose up -d
fi