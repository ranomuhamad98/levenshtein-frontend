var ocrSessionApi = {
    config: null,
    findAll: function (offset, limit, callback)
    {
        let url = ocrSessionApi.config.LEVENSHTEIN_API + "/ocrsessions/" + offset + "/" + limit;
        console.log(url)
        AppUtil.get(url, function(result){
            let data = result.payload;
            console.log(data)
            if(result.success )
            {
                if(callback != null && callback.success != null)
                    callback.success(data);
            }
            else
            {
                if(callback != null && callback.error != null)
                    callback.error(data);
            }
        }, { user: GLOBAL.session.user })
    }
    ,
    findByKeyword: function (keyword, offset, limit, callback)
    {
        let url = ocrSessionApi.config.LEVENSHTEIN_API + "/ocrsessions/find/" + keyword + "/" + offset + "/" + limit;
        AppUtil.get(url, function(result){
            let data = result.payload;
            if(result.success )
            {
                if(callback != null && callback.success != null)
                    callback.success(data);
            }
            else
            {
                if(callback != null && callback.error != null)
                    callback.error(data);
            }
        }, { user: GLOBAL.session.user })
    }
    ,
    delete: function (id, callback)
    {
        let url = ocrSessionApi.config.LEVENSHTEIN_API + "/ocrsessions/delete/" + id;
        console.log(url)
        $.get(url, function(result){
            let data = result.payload;
            console.log(data)
            if(result.success )
            {
                if(callback != null && callback.success != null)
                    callback.success(data);
            }
            else
            {
                if(callback != null && callback.error != null)
                    callback.error(data);
            }
        })
    }

}