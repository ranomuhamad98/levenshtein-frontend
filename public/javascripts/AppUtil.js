var AppUtil =
{
    scripts: null,
    data2Options: function(items, valueCol, labelCol, placeholder)
    {
        let options = [];
        if(placeholder != null)
        {
            let opt = { value: -1, label: " ----- " + placeholder + " ----- " };
            options.push(opt);
        }
        items.map((item)=>{
            let opt = { value: item[valueCol], label: item[labelCol] };
            options.push(opt);
        })

        return options;
    }
    ,
    modifyHeader: function(header)
    {
        for (var prop in header) {
            if (Object.prototype.hasOwnProperty.call(header, prop)) {
                // do stuff
                if(typeof header[prop] == 'object')
                {
                    header[prop] = JSON.stringify(header[prop]);
                }
            }
        }

        return header;
    }
    ,
    get: function(url, callback, headers)
    {
        if(headers == null)
            headers = {};
        if(headers.user == null && GLOBAL.desktop != null)
            headers.user = GLOBAL.desktop.session.user;

        headers = AppUtil.modifyHeader(headers);

        $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    post: function(url, param, callback, headers)
    {
        if(headers == null)
            headers = {};
        if(headers.user == null && GLOBAL.desktop != null)
            headers.user = GLOBAL.desktop.session.user;

        headers = AppUtil.modifyHeader(headers);

        param = JSON.stringify(param);
        $.ajax({
            url: url,
            method: 'POST',
            data: param,
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result, textStatus, jqXHR) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    put: function(url, param, callback, headers)
    {
        if(headers == null)
            headers = {};
        if(headers.user == null && GLOBAL.desktop != null)
            headers.user = GLOBAL.desktop.session.user;
        headers = AppUtil.modifyHeader(headers);

        param = JSON.stringify(param);
        $.ajax({    
            url: url,
            method: 'PUT',
            data: param,
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    delete: function(url, callback, headers)
    {
        if(headers == null)
            headers = {};
        if(headers.user == null && GLOBAL.desktop != null)
            headers.user = GLOBAL.desktop.session.user;

        headers = AppUtil.modifyHeader(headers);

        $.ajax({
            url: url,
            method: 'DELETE',
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    getScript: function(url, callback)
    {
        if(AppUtil.scripts == null)
            AppUtil.scripts = [];
        
        if(AppUtil.scripts.indexOf(url) == -1)
        {
            AppUtil.scripts.push(url);
            $.getScript(url, callback);

        }
        else
        {
            if(callback != null)
                callback();
        }
    }
    ,
    //Returns true if it is a DOM node
    isDomNode: function(o){
        return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
        );
    }
    ,
    //Returns true if it is a DOM element    
    isDomElement: function(o){
        return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }
    ,
    randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    ,
    getApplication: function( appID)
    {
        let promise = new Promise((resolve, reject)=>{
            let url = "/application/get-by-appid/" + appID;
            AppUtil.get(url, function(response){
                console.log(url)
                console.log(response)
                if(response.success)
                {
                    let app = response.payload;
                    app.appConfig = JSON.parse(app.appConfig);
                    resolve(app);
                }
                else
                {
                    reject({ error: response.error, message: response.message })
                }
            })
        });
        return promise;
    }
    ,
    sendEmail: function( emailMessage)
    {
        let promise = new Promise((resolve, reject)=>{
            this.getApplication("appAccountManager").then((app)=>{
                let url = app.appConfig.BASE_API_URL + "/emails/create";
                emailMessage.isSent = 0;
                AppUtil.post(url, emailMessage, function(response){
                    if(response.success)
                        resolve()
                    else 
                        reject(response)
                })
            }).catch((err)=>{
                reject({ success: false, error: err })
            })
        });
        return promise;
    }
    ,
    splitCache( val ) {
        return val.split( /,\s*/ );
    }
    ,
    extractLast( term ) {
        return AppUtil.splitCache( term ).pop();
    }
    ,
    getCaches: function(tag)
    {
        let caches = [];
        GLOBAL.desktop.caches.map((cache)=>{
            if(cache.cacheName == tag)
                caches.push(cache.cacheData)
        })

        return caches;
    }
    ,
    findCache: function(cacheName, cacheData)
    {
        let foundCache = null;
        console.log("cacheName, cacheData")
        console.log(cacheName + ": " + cacheData)

        GLOBAL.desktop.caches.map((cache)=>{
            console.log(cache);
            if(cache.cacheName == cacheName && cache.cacheData == cacheData)
                foundCache = cache;
        })

        return foundCache;
    }
    ,
    saveCache: function(cacheName, cacheData)
    {
        let datas = cacheData.split(",")

        for(let i = 0; i < datas.length; i++)
        {
            let data = datas[i].trim();
            let foundCache = AppUtil.findCache( cacheName, data);
            console.log("foundCache")
            console.log(foundCache)
    
            if(foundCache == null)
            {
                let url = "/caches/create";
                let o = { cacheName: cacheName, cacheData: data };
                console.log("new cache")
                console.log(o)
                GLOBAL.desktop.caches.push(o);
    
                AppUtil.post(url, o, function(response){
                    console.log(response)
                })
            }
        }

    }

}