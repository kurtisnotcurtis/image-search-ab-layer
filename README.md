Image Search Abstraction Layer
==============================

This is the fifth API project in FreeCodeCamp's Backend Web Development certification.

Find out more [about FreeCodeCamp](https://www.freecodecamp.org/about/).


Usage
-----

On the front-end,
- Use the form provided in [index.html](https://img-search-ab-layer.glitch.me/) to search Google for images via keyword.  

On the back-end,
- Send an HTTP GET request to:
```
https://img-search-ab-layer.glitch.me/api/imagesearch/
```
- You can include a query string as either a URL parameter appended to the end of the URL or as a URL query string
- Optionally, you can also include a URL query string `offset` to specify pagination --> (?offset=`myPage`)
