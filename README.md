# Getting Started

<h3> Import on your HTML Page </h2>

```html
  <!--Works with jquery-1.11.0 or greater!-->
  <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="></script><br>
  <script src="https://cdn.jsdelivr.net/gh/wakanda-cloud/wakanda-js@v1.3/dist/wakanda-min.js"></script>
```
Start wakanda API like below

```javascript
  $(document).ready(function() {
      var yourEncryptKey = "qwertyui";
      var yourApiKey = "fa1ccde140d8281694e305e53d48fe2c";
      new Wakanda(yourEncryptKey, yourApiKey, {
          client: "Wakanda",
          module: "Dashboard",
          submodule: "Widgets",
          title:  "Frequency Statistics",
          geoLocation: true
      });
  });
```

Now annotate your HTML elements with ".wakanda" class:

```html
  <button class="wakanda">Save</button>
  <a class="wakanda" href="anyurl">Click here</a>
  <img class="wakanda" src="anyImage"/>
```
When these elements are clicked, they will fire statistic from you app to your dashboard.

<h2> Advanced </h2>

If you want do some validations before statistic send or you want fire statistic with asynchronous
functions you can fire statistic manually like below:

```javascript
  //Example 1
  Wakanda.instance.fireRegisterStatistic(Wakanda.instance);
  
  //Example 2: store Wakanda in a global variable to use after
  var wakanda = new Wakanda(yourEncryptKey, yourApiKey, appConfigs);
  wakanda.fireRegisterStatistic(wakanda);
```

If you working with a responsive page and some primary attributes (module, submodule, title) changes after
user use your pages you can configure these attributes manually too:

```javascript
  var wakanda = new Wakanda(yourEncryptKey, yourApiKey);
  
  function someUserEvent() {
    wakanda.client = "Other client";
    wakanda.module = "Other module";
    wakanda.submodule = "Other submodule";
    wakanda.title = "Other title";
  }
  
  function save() {
    wakanda.fireRegisterStatistic(wakanda);
  }
  
```

<h4> To develop improvements just clone the project, do what you wanna do and run:

```nodemon
npm install
node compile.js
```


