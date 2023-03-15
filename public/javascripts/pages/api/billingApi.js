var billingApi = {
    config: null,
    findAll: function (date1, date2, callback)
    {
        let url = billingApi.config.LEVENSHTEIN_API + "/billing/info?date1=" + date1 + "&date2=" + date2;
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