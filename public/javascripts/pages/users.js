import { GenericListPage } from "./genericlistpage.js";

export class UserPage extends GenericListPage
{

    init(config)
    {
        var me = this;
        super.init(config)

        me.loadData(me,  { success: function(payload){ me.loadDataSuccess(me, payload) }, error: null} )
        me.initControls();

    }

    getApiScript()
    {
        return ["/javascripts/pages/api/userApi.js", "userApi"];
    }

    getTableId()
    {
        return "userList";
    }

    getColumns()
    {
        return [
            { data: 'no' },
            { data: 'firstname'},
            { data: 'email'},
            { data: 'edit'}
        ]
    }

    initRows(rows)
    {
        for (var i =0; i < rows.length;i++)
        {

            rows[i].edit = "<div style='text-decoration:underline; cursor:pointer' class='edit-user' data='" + rows[i].id + "'>Edit</div>";

        }

        return rows;
    }

    initEvents()
    {
        $(".edit-user").on("click", function()
        {
            let id = $(this).attr("data");
            location = "/users/edit?user_id=" + id;
        })

        $("#btn-new-user").on("click", function(){
            location = "/users/add";
        })
    }
}