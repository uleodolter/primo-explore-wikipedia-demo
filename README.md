# Adding wikipedia service to fullview - Demo


##Usage

- add a package.json file in your customization package folder root.

For example, if you are developing a package for the Auto1 view

- Add the file under *primo-explore-devenv/primo-explore/custom/Auto1*

- The content of the file should be:

```
{
  "name": "<your view code>",
  "version": "<your version>",
  "description": "",
  "author": "",
  "devDependencies": {
    "primo-explore-wikipedia-demo": "0.0.2"
  }
}
```

- go to your command line (in windows: type cmd in the start > run box)
- navigate to the location of the package.json file
   
   ```
      cd primo-explore-devenv/primo-explore/custom/Auto1
   ```
- type npm install
- you will se a new folder was added in the same location named node_modules
- Now you can see the widget in your enviornment


##Wikipedia Web Service

Unfortunately the Wikipedia web service which is used for this component is currently not public accessible.

Sample of usage and output:

- http://ws-test.obvsg.at/cgi-bin/getWikipediaOverview.fpl?pnd=118559230,135891388&isbns=3878775008&lang=en&vid=ACC&format=json&callback=wikipedia


```javascript
wikipedia(
{
  "pnds": [
    {
      "last_update": 20161024172711,
      "wiki_url": "http://en.wikipedia.org/wiki/Franz_Kafka",
      "author": "Franz Kafka",
      "img_url": "http://commons.wikimedia.org/wiki/Special:FilePath/Franz_Kafka_1917.jpg",
      "abstract": "Franz Kafka (3 July 1883 – 3 June 1924) was a German-language writer of novels and short stories who is widely regarded as one of  the major figures of 20th-century literature. His work, which fuses elements of realism and the fantastic, typically features isolated protagonists faced by bizarre or surrealistic predicaments and incomprehensible social-bureaucratic powers, and has been interpreted as exploring themes of alienation, existential anxiety, guilt, and absurdity. His best known works include \\&quot;Die Verwandlung\\&quot; (\\&quot;The Metamorphosis\\&quot;), Der Process (The Trial), and Das Schloss (The Castle). The term Kafkaesque has entered the English language to describe situations like those in his writing.Kafka was born into a middle-class, German-speaking Jewish family in Prague, the capital of the Kingdom of Bohemia, then part of the Austro-Hungarian Empire. He trained as a lawyer, and after completing his legal education he was employed with an insurance company, forcing him to relegate writing to his spare time. Over the course of his life, Kafka wrote hundreds of letters to family and close friends, including his father, with whom he had a strained and formal relationship. He died in 1924 at the age of 40 from tuberculosis.Few of Kafka&#39;s works were published during his lifetime: the story collections Betrachtung (Contemplation) and Ein Landarzt (A Country Doctor), and individual stories (such as \\&quot;Die Verwandlung\\&quot;) were published in literary magazines but received little public attention.  Kafka&#39;s unfinished works, including his novels Der Process, Das Schloss and Amerika (also known as Der Verschollene, The Man Who Disappeared), were ordered by Kafka to be destroyed by his friend Max Brod, who nonetheless ignored his friend&#39;s direction and published them after Kafka&#39;s death.",
      "pnd": "118559230",
      "uri": "Franz_Kafka"
    }
  ],
  "lang": "en",
  "req_isbn": "3878775008",
  "isbns": [
    "3878775008"
  ]
});
```

More information on this service will follow.
