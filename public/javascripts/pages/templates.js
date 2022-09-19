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
        console.log('initrows')
        for (var i =0; i < rows.length;i++)
        {   
            if(me.session.role != "SUPER_ADMIN")
                rows[i].delete =  "";
            rows[i].createdAt = moment(rows[i].createdAt).format("DD-MM-YYYY HH:mm:ss")

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