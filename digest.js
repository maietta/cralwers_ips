const fs = require('fs');
const { JSDOM } = require('jsdom');

// Regular expressions to match IPv4 and IPv6 addresses, including CIDR notation
const ipv4Regex = /(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?/g;
const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]|[1-9]?)[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]|[1-9]?)[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]|[1-9]?)[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]|[1-9]?)[0-9]))(\/\d{1,3})?/g;

// Function to save IP addresses to a text file
function saveToFile(filename, ipAddresses) {
    fs.writeFileSync(filename, ipAddresses.join('\n'));
}

// Process DuckDuckGo IP addresses
fs.readFile('duckduckgo.html', 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading DuckDuckGo HTML file:', err);
        return;
    }
    const dom = new JSDOM(html);
    const text = dom.window.document.body.textContent;
    const ipv4Matches = text.match(ipv4Regex) || [];
    const ipv6Matches = text.match(ipv6Regex) || [];
    const ipAddresses = [...ipv4Matches, ...ipv6Matches];
    saveToFile('duckduckgo_ip_addresses.txt', ipAddresses);
    console.log(`Extracted ${ipAddresses.length} IP addresses from DuckDuckGo and saved them to duckduckgo_ip_addresses.txt`);
});

// Process Googlebot IP addresses
fs.readFile('googlebot.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading Googlebot JSON file:', err);
        return;
    }
    const jsonData = JSON.parse(data);
    const ipAddresses = [];
    jsonData.prefixes.forEach(prefix => {
        if (prefix.ipv4Prefix) {
            ipAddresses.push(prefix.ipv4Prefix);
        }
        if (prefix.ipv6Prefix) {
            ipAddresses.push(prefix.ipv6Prefix);
        }
    });
    saveToFile('googlebot_ip_addresses.txt', ipAddresses);
    console.log(`Extracted ${ipAddresses.length} IP addresses from Googlebot and saved them to googlebot_ip_addresses.txt`);
});
