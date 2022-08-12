import { GenericListPage } from "./genericlistpage.js";

export class OcrSessionPage extends GenericListPage
{

    init(config)
    {
        var me = this;
        super.init(config)

        setInterval(function() {
            me.loadData(me,  { success: function(payload){ me.loadDataSuccess(me, payload) }, error: null} )
            me.initControls();
        }, 10000)

    }

    getApiScript()
    {
        return ["/javascripts/pages/api/ocrSessionApi.js", "ocrSessionApi"];
    }

    getTableId()
    {
        return "ocrSessionList";
    }

    getColumns()
    {
        return [
            { data: 'no' },
            { data: 'sessionID'},
                { data: 'sessionStartDate'},
                { data: 'sessionEndDate' },
                { data: 'document' },
                { data: 'runningStatus' }
        ]
    }

    initRows(rows)
    {
        for (var i =0; i < rows.length;i++)
        {
            if(rows[i].runningStatus == 0)
                rows[i].runningStatus = "<div style='color: #0000FF'>Not Started</div>";
            if(rows[i].runningStatus == 1)
                rows[i].runningStatus = "<div style='color: #666666'>Running...</div>";
            if(rows[i].runningStatus == 2)
                rows[i].runningStatus = "<div style='color: #00cc00'>Finish</div><div style='text-decoration:underline; cursor:pointer' class='view-ocr-result' data='" + rows[i].id + "'>View Result</div>";
            if(rows[i].runningStatus == 3)
                rows[i].runningStatus = "<div style='color: #FF0000'>Fail</div>";

        }

        return rows;
    }

    initEvents()
    {
        $(".view-ocr-result").on("click", function()
        {
            let id = $(this).attr("data");
            location = "/ocrsessions/view?id=" + id;
        })
    }
}