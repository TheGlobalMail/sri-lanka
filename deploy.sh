#!/bin/bash
grunt build
s3cmd sync -P dist/ s3://sri-lanka.theglobalmail.org
s3cmd -m text/html put dist/monks-army.html s3://sri-lanka.theglobalmail.org/monks-army
s3cmd -m text/html put dist/timeline.html s3://sri-lanka.theglobalmail.org/timeline
grunt clean:dist
