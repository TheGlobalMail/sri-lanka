#!/bin/bash
grunt build
s3cmd sync -P dist/ s3://sri-lanka.theglobalmail.org
grunt clean:dist
