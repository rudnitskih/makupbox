#!/bin/bash 
cp -r ./out ./out_min 
gulp deploy
git add . -A
git commit -m "$1"
git push
rm -r ./out
rm -r ./out_min