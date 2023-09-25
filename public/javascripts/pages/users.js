import { GenericListPage } from "./genericlistpage.js";

export class UserPage extends GenericListPage
{

    init(config, session)
    {
        var me = this;
        super.init(config, session)
        me.session = session;
        GLOBAL.session.user = {
            email: session.email,
            name: session.name,
            userRole: session.role,
            lastLogin: session.lastLogin
        }


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
            { data: 'userRole'},
            { data: 'edit'}
        ]
    }

    initRows(rows)
    {
        var me = this;
        for (var i =0; i < rows.length;i++)
        {
            if((rows[i].userRole != 'ADMIN' && rows[i].userRole != 'SUPER_ADMIN')  || ( rows[i].userRole == 'ADMIN' && me.session.role == 'SUPER_ADMIN' ))
                rows[i].edit = "<div style='text-decoration:underline; cursor:pointer' class='edit-user' data='" + rows[i].id + "'>Edit</div>";
            else 
            {
                rows[i].edit  = "<div></div>"
                rows[i].delete  = "<div></div>"
            }
                
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