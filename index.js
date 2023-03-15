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
      title: 'Click Here Podcast',
      link: 'https://podcasts.apple.com/us/podcast/click-here/id1225077306',
      description: 'Every Tuesday, Click Here tells stories about the people and ideas shaping our digital world. We go beyond the headlines, taking listeners on a journey behind-the-scenes of some of today’s biggest cyber and intelligence news. Hosted by former NPR Investigations correspondent Dina Temple-Raston',
      pubDate: new Date(),
      media: '<media:content medium="image" url="https://cms.therecord.media/uploads/2021_04_Code_computer_screen_87538db80f.jpg"/>',
      guid: '1',
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
              { media: item.media }
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
response.send(rssXml);

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
