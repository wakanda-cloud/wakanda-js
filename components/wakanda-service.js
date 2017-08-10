class Wakanda {

    constructor(encryptkey, apikey, options) {
        this.server = "https://wakanda-statistic-receiver.herokuapp.com/statistics";
        this.async = options.async;
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
        if(event && jQuery(event.currentTarget).attr('alt')) {
            linkClicked2 = jQuery(event.currentTarget).attr('alt');
        } else if(event) {
            linkClicked2 = jQuery(event.currentTarget).html();
        } else {
            linkClicked2 = "N/A";
        }

        let jsonData = {
            "client": context._client,
            "module": context._module,
            "submodule": context._submodule,
            "title": context._title,
            "capturedDate" : context._capturedDate,
            "linkClicked": context._linkClicked && linkClicked2 === "N/A" ? context._linkClicked : linkClicked2,
            "location": context.geoLocation
        };

        let json = {
            apiKey: context.apiKey,
            data: context.encrypt(JSON.stringify(jsonData))
        };

        var settings = {
            "async": context._async,
            "crossDomain": true,
            "url": context.server,
            "method": "POST",
            "type": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "d4db44ae-d915-c323-aa56-feb9289cfdef"
            },
            "contentType": "application/json",
            "processData": false,
            "data": JSON.stringify(json),
            "success": function (response) {
                console.log(response);
            }
        }

        jQuery.ajax(settings);
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
