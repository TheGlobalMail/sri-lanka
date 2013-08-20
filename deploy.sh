#!/bin/bash
grunt build
cp dist/monks-army.html dist/monks-army
cp dist/timeline.html dist/timeline
s3cmd sync -P dist/ s3://sri-lanka.theglobalmail.org
s3cmd -m text/html s3://sri-lanka.theglobalmail.org/monks-army
s3cmd -m text/html s3://sri-lanka.theglobalmail.org/timeline
grunt clean:dist
