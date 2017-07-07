class Wakanda {

    constructor(encryptkey, apikey, options) {
        this.server = "https://wakanda-statistic-receiver.herokuapp.com/statistics";
        this.async = true;
        this.encryptkey = encryptkey;
        this.apiKey = apikey;
        this.client = options.client;
        this.module = options.module;
        this.submodule = options.submodule;
        this.title = options.title;
        if(options.geoLocation) {
            this.configGeolocation();
        }

        var wakanda = this;
        jQuery(".wakanda").bind('click', function (event) {
            wakanda.fireRegisterStatistic(wakanda, event);
        });

        Wakanda.instance = this;
    }

    fireRegisterStatistic(context, event) {
        context = this instanceof Wakanda ? this : context;
        let linkClicked2 = "";
        if(event && $(event.currentTarget).attr('alt')) {
            linkClicked2 = $(event.currentTarget).attr('alt');
        } else if(event) {
            linkClicked2 = $(event.currentTarget).html();
        } else {
            linkClicked2 = "N/A";
        }

        let jsonData = {
            "client": context._client,
            "module": context._module,
            "submodule": context._submodule,
            "title": context._title,
            "capturedDate" : context._capturedDate,
            "linkClicked": linkClicked2,
            "location": context.geoLocation
        };

        let json = {
            apiKey: context.apiKey,
            data: context.encrypt(JSON.stringify(jsonData))
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": context.server,
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "d4db44ae-d915-c323-aa56-feb9289cfdef"
            },
            "processData": false,
            "data": JSON.stringify(json)
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    configGeolocation() {
        let that = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                that.geoLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            }, function () {
                console.log("Geo location not found");
            });
        } else {
            console.log("Geo location not supported");
        }
    }

    set client(client) {
        this._client = client;
    }

    get client() {
        return this._client;
    }

    set module(module) {
        this._module = module;
    }

    get module() {
        this._module;
    }

    set submodule(submodule) {
        this._submodule = submodule;
    }

    get submodule() {
        return this._submodule;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set linkClicked(linkClicked) {
        this._linkClicked = linkClicked;
    }

    get linkClicked() {
        return this._linkClicked;
    }

    set async(isAsync) {
        this._async = isAsync;
    }

    set geoLocation(geolocation) {
        this._lat = geolocation.lat;
        this._lng = geolocation.lng;
    }

    get geoLocation() {
        return this._lat && this._lng ? this._lat + ";" + this._lng : undefined;
    }

    set location(location) {
        this._location = location;
    }

    get location() {
        return this._location;
    }

    set capturedDate(capturedDate) {
        this._capturedDate = capturedDate;
    }

    get capturedDate() {
        return this._capturedDate;
    }

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.encryptkey, {
            mode: CryptoJS.mode.CTR
        }).toString();
    }
}

Wakanda.instance = function(){}
