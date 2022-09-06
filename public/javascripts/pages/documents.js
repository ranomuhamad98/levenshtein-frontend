import { GenericListPage } from "./genericlistpage.js";

export class DocumentPage extends GenericListPage
{
    getApiScript()
    {
        return ["/javascripts/pages/api/documentApi.js", "documentApi"];
    }

    getTableId()
    {
        return "documentlist";
    }

    initRows(rows)
    {
        for (var i =0; i < rows.length; i++)
        {
            rows[i].createTemplate = "<div class='row-menu row-create-template' data='" + rows[i].filename + "'>Create Template</div>"
            rows[i].process = "<div class='row-menu row-ocr'  data='" + rows[i].id + "'>OCR</div>"
            console.log('initrows')
            rows[i].upload_date = moment(rows[i].upload_date).format("DD-MM-YYYY HH:mm:ss")
            rows[i].updatedAt = moment(rows[i].updatedAt).format("DD-MM-YYYY HH:mm:ss")
        }
        return rows;
    }

    initEvents()
    {
        var me = this;
        $(".row-create-template").on('click', function(){
            let data = $(this).attr("data")
            me.onCreateTemplateClick(data)
        } )

        $(".row-ocr").on('click', function(){
            let data = $(this).attr("data")
            me.onOcrClick(data)
        } )

        $("#btn-close-new-template").on('click', function(){
            $("#newTemplate").hide(500);
            me.loadData(me,  { success: function(payload){ me.loadDataSuccess(me, payload) }, error: null} )
        })
    }

    getColumns()
    {
        return [
            { data: 'no' },
                { data: 'filename'},
                { data: 'upload_date' },
                { data: 'updatedAt' },
                { data: 'upload_by' },
                { data: 'createTemplate' },
                { data: 'process' }
        ]
    }

    onCreateTemplateClick(uri)
    {
        $("#newTemplate").show(500);
        $("#newTemplateFrame")[0].src = "/templates/new?uri=" + encodeURIComponent(uri);

        //window.open("/templates/new?uri=" + encodeURIComponent(uri), "","height=200,width=400,scrollbars=no")
    }

    onOcrClick(idDocument)
    {
        location = "/ocrsessions/add?documentid=" + encodeURIComponent(idDocument);
    }
}