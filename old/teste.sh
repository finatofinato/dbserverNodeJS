#!/bin/bash

i=0

while [ $i -lt 4000 ]
do

curl http://localhost/random/?number=$i


i=$[$i+1]
done
