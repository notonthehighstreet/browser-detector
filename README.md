# Browser Detector v1.0.0
A simple tool to detect old browsers and notify users that they might experience some problems.

### How to use it

- The first step is to include the javascript file with the desired version on the `<head>` tag so that it gets loaded before any other content:

```html
<script src="//s3-eu-west-1.amazonaws.com/mindera-bd-test/1.0.0/detector.min.js"></script>
```

- Then you need to initialize anywhere on the `<body>` the detector with the browsers and the browser versions you want to compare e.g.:

```javascript
window.bdetector.detector({
    vs: {i: 9, f: 40, s: 6, c: 50}
});
```

After that, if the user is on an older browser version than the specified, the user will receive a notification with the information that some errors may occur.