import { GenericListPage } from "./genericlistpage.js";

export class OcrSessionPage extends GenericListPage
{

    init(config, session)
    {
        var me = this;
        super.init(config)
        me.session = session;

        setInterval(function() {
            me.loadData(me,  { success: function(payload){ me.loadDataSuccess(me, payload) }, error: null} )
            me.initControls();
        }, 5000)

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
        var me = this;
        console.log('initrows')
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

            if(me.session.role != "SUPER_ADMIN")
                rows[i].delete = "<div></div>"

            rows[i].sessionStartDate = moment(rows[i].sessionStartDate).format("DD-MM-YYYY HH:mm:ss")
            rows[i].sessionEndDate = moment(rows[i].sessionEndDate).format("DD-MM-YYYY HH:mm:ss")

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