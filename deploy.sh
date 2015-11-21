#!/bin/bash 
gulp generate
cp -r ./out ./out_min 
gulp deploy
rm -r -f ./.publish
git add .
testMSG=${1:="auto-commit"}
git commit -m "testMSG"
git push bitbucket
rm -r ./out
rm -r ./out_min