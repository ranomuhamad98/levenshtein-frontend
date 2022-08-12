var HudaTableEditor = {
    apply: function(tbl, onchange, onSelect, disabledcols, disabledrows)
    {
        let trs = $(tbl).children("tr");
        let rowCounter = 0;
        trs.each(function() {

            let tds = $(this).find("TD");

            let counter = 0;
            tds.each( function() {
                let td = this;

                $(td).attr("data-temp",  "[" + rowCounter  + ", " + counter + "]")
                
                let ok = true;
                if(disabledcols  != null)
                {
                    if(disabledcols.includes(counter))
                        ok = false;
                }

                if(disabledrows  != null)
                {
                    if(disabledrows.includes(rowCounter))
                        ok = false;
                }

                if(ok)
                {
                    $(td).on("click", function()
                    {
                        //alert("here")
                        let child = $(td).html();
                        
                        let tag = null;
                        try
                        {
                            tag = $(child).prop("tagName")
                        }
                        catch(e)
                        {
                            tag = null
                        }
                        if(tag == undefined)
                            tag = null;
    
                       
                        if(tag == null || $(child).prop("tagName").toLowerCase() != "input")
                        {
                            let inp = document.createElement("input")
    
                            $(inp).on("blur", function(){
                                $(td).html("")
                                let text = $(inp).val()
                                $(td).html(text);
                                if(onchange != null)
                                {
                                    let data = $(td).attr("data-temp")
                                    data = JSON.parse(data);
                                    
                                    onchange(HudaTableEditor.getTableValues(tbl), data, text, td, tbl)
                                }
                                    
                            })
    
                            $(inp).on("keypress", function(e)
                            {
                                if(e.which == 13)
                                {
                                    $(inp).blur()
                                }
                            })
    
                            $(inp).attr("type", "text")
                            $(inp).attr("style", "width: 100%; height: 100%; border: solid 1px #ccc")
                            $(inp).val( $(td).text())
                            
                            $(td).html("")
                            $(td).append(inp);
                            $(inp).focus();
                        }
                        
                        if(onSelect != null)
                            onSelect(td)
                    })

                }
                counter++;

            })

            rowCounter++;
        })
    }

    ,
    getTableValues: function(tbl)
    {
        let data = [];
        let trs = $(tbl).children("tr");


        trs.each(function() {
            let row = [];
            let tds = $(this).children("TD");
            tds.each( function() {
                row.push($(this).text())
            });
            data.push(row);
        })

        return data;
    }
}