var documentApi = {
    config: null,
    session: null,
    findAll: function (offset, limit, callback)
    {

        console.log("SESSION")
        console.log(documentApi.session)
        let url = documentApi.config.LEVENSHTEIN_API + "/documents/" + offset + "/" + limit;

        if(documentApi.session.role.toLowerCase().indexOf("admin") == -1)
            url += "?username=" + documentApi.config.CURRENT_USER.email;

        console.log(url)
        AppUtil.get(url, function(result){

            console.log(result)
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
        let url = documentApi.config.LEVENSHTEIN_API + "/documents/find/" + keyword + "/" + offset + "/" + limit;
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
        let url = documentApi.config.LEVENSHTEIN_API + "/documents/delete/" + id;
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