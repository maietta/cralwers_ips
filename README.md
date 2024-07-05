
# Parse web crawler IP ranges into nice lists.

Fetch the pages, saving them into their files:

Fetch DuckDuckGo's
`curl https://duckduckgo.com/duckduckgo-help-pages/results/duckduckbot/ -o duckduckgo.html`


Also fetch Google's
`curl https://developers.google.com/static/search/apis/ipranges/googlebot.json -o googlebot.json`

# Process the files into their final txt files.

`bun digest.js`