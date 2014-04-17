#!/bin/bash
# Batch script to deploy the website to a given users IFS space for testing
echo "Enter username, follow by [ENTER]:"
read username

echo "Enter folder to delpoy to, followed by [ENTER]:"
read folder

rsync -rpzv ./current/* "${username}"@sftp.itd.umich.edu:/afs/umich.edu/user/"${username:0:1}"/"${username:1:1}"/"${username}"/Public/html/"${folder}"
