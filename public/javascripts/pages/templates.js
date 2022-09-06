import { GenericListPage } from "./genericlistpage.js";

export class TemplatePage extends GenericListPage
{
    getApiScript()
    {
        return ["/javascripts/pages/api/templateApi.js", "templateApi"];
    }

    getTableId()
    {
        return "documentlist";
    }


    initRows(rows)
    {
        var me = this;
        for (var i =0; i < rows.length;i++)
        {

            rows[i].createdAt = moment(rows[i].createdAt).format("DD-MM-YYYY hh:mm:ss")

        }

        return rows;
    }

    getColumns()
    {
        return [
            { data: 'no' },
                { data: 'title'},
                { data: 'description' },
                { data: 'createdAt' }
        ]
    }
}