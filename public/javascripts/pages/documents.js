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
            rows[i].createTemplate = "<div class='row-button row-create-template' data='" + rows[i].filename + "'>Create Template</div>"
            rows[i].process = "<div class='row-button row-ocr'  data='" + rows[i].filename + "'>OCR</div>"
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
        })
    }

    getColumns()
    {
        return [
            { data: 'no' },
                { data: 'filename'},
                { data: 'upload_date' },
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

    onOcrClick(uri)
    {
        location = "/ocrsessions/add?document=" + encodeURIComponent(uri);
    }
}