
# Parse web crawler IP ranges into nice lists.

Fetch the pages, saving them into their files:

 curl https://duckduckgo.com/duckduckgo-help-pages/results/duckduckbot/ -o duckduckgo.html
 curl https://developers.google.com/static/search/apis/ipranges/googlebot.json -o googlebot.json
 
# Process the files into their final txt files.

bun digest.js