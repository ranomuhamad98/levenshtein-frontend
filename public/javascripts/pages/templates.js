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