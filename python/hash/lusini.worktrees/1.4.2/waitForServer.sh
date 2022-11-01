#!/bin/bash
set -eu

declare -r HOST="dev.lusini.com"
declare -r PORT="8000"

# wait until the responsecode of curl is 200 and try the whole script maximum 90seconds before timeout
# timeout for curl is 2 seconds and curl waits fo a rc of 200
wait-for-url() {
    echo "Testing $1"
    # set --foreground to ract to the SIGINT
    timeout --foreground -s TERM 90 bash -c \
    'while [[ "$(curl -k -s -f -I -m 2 -o /dev/null -L -w ''%{http_code}'' ${0})" != "200" ]];\
    do echo "Waiting for ${0}" && sleep 2;\
    done' ${1}
    echo "Server is reachable"
}
url="https://${HOST}:${PORT}"

wait-for-url $url 