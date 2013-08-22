#!/bin/bash
grunt build
s3cmd sync -P dist/ s3://sri-lanka.theglobalmail.org
s3cmd -P -m text/html put dist/monks-army.html s3://sri-lanka.theglobalmail.org/monks-army
s3cmd -P -m text/html put dist/timeline.html s3://sri-lanka.theglobalmail.org/timeline
s3cmd -P -m text/html put dist/smugglers-prey.html s3://sri-lanka.theglobalmail.org/smugglers-prey
grunt clean:dist
