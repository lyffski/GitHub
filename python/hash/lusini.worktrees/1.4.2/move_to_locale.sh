#!/bin/bash
echo $SHELL
cd public
mkdir -p $1
mv $(find . -maxdepth 1 ! -path . | grep -v "_headers" | grep -v "_redirects" | egrep -v "^\.\/$1$") ./$1/