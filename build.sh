#!/usr/bin/env bash

npm install

./node_modules/.bin/coffee -c -w -o . src
