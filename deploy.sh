#!/bin/bash

if [ ! $# == 1 ]; then
  echo "Usage: $0 {staging,production}"
  exit
fi

target="$1"

if [ $target == "staging" ] ; then
  echo "Deploying to http://sri-lanka-staging.theglobalmail.org"
  grunt build:staging
  s3cmd sync -P dist/ s3://sri-lanka-staging.theglobalmail.org
  s3cmd -P -m text/html put dist/monks-army.html s3://sri-lanka-staging.theglobalmail.org/monks-army
  s3cmd -P -m text/html put dist/timeline.html s3://sri-lanka-staging.theglobalmail.org/timeline
  s3cmd -P -m text/html put dist/smugglers-prey.html s3://sri-lanka-staging.theglobalmail.org/smugglers-prey
  s3cmd -P -m text/html put dist/brothers-grip.html s3://sri-lanka-staging.theglobalmail.org/brothers-grip
  grunt clean:dist
fi
if [ $target == "production" ] ; then
  echo "Deploying to http://sri-lanka.theglobalmail.org"
  grunt build
  s3cmd sync -P dist/ s3://sri-lanka.theglobalmail.org
  s3cmd -P -m text/html put dist/monks-army.html s3://sri-lanka.theglobalmail.org/monks-army
  s3cmd -P -m text/html put dist/timeline.html s3://sri-lanka.theglobalmail.org/timeline
  s3cmd -P -m text/html put dist/smugglers-prey.html s3://sri-lanka.theglobalmail.org/smugglers-prey
  s3cmd -P -m text/html put dist/brothers-grip.html s3://sri-lanka.theglobalmail.org/brothers-grip
  grunt clean:dist
fi