var templateApi = {
    config: null,
    findAll: function (offset, limit, callback)
    {
        let url = templateApi.config.LEVENSHTEIN_API + "/templates/" + offset + "/" + limit;
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
    ,
    findByKeyword: function (keyword, offset, limit, callback)
    {
        let url = templateApi.config.LEVENSHTEIN_API + "/templates/find/" + keyword + "/" + offset + "/" + limit;
        $.get(url, function(result){
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
        })
    }
    ,
    delete: function (id, callback)
    {
        let url = templateApi.config.LEVENSHTEIN_API + "/templates/delete/" + id;
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