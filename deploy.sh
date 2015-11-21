#!/bin/bash 
gulp generate
cp -r ./out ./out_min 
gulp deploy
rm -r -f ./.publish
git add .
git commit -m "$1"
git push bitbucket
rm -r ./out
rm -r ./out_min