var express = require('express')
var app = express(); // Import required modules
const xml = require('xml');

app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))



app.get('/', function(request, response) {



// Sample RSS feed data
const feedData = {
  title: 'Example RSS Feed',
  link: 'https://example.com',
  description: 'A sample RSS feed created using JavaScript',
  items: [
    {
      title: 'First Item',
      link: 'https://example.com/first-item',
      description: 'This is the first item in the RSS feed',
      pubDate: new Date(),
      guid: '1',
    },
    {
      title: 'Second Item',
      link: 'https://example.com/second-item',
      description: 'This is the second item in the RSS feed',
      pubDate: new Date(),
      guid: '2',
    },
  ],
};

// Generate the RSS XML content
const rssXml = xml(
  {
    rss: [
      {
        _attr: {
          version: '2.0',
        },
      },
      {
        channel: [
          { title: feedData.title },
          { link: feedData.link },
          { description: feedData.description },
          ...feedData.items.map((item) => ({
            item: [
              { title: item.title },
              { link: item.link },
              { description: item.description },
              { pubDate: item.pubDate.toISOString() },
              { guid: item.guid },
            ],
          })),
        ],
      },
    ],
  },
  { declaration: true }
);

// Output the generated RSS XML
console.log(rssXml);

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
