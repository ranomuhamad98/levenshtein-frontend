export class DocumentUploadPage
{
    init(config, session)
    {
        this.config = config;

        $("li#" + session.activeLink + " > a > p").css("color", "#cc5522")


        console.log(this.config)
        $("#btn-clear").click(function(){
            Dropzone.forElement('#myDropzone').removeAllFiles(true)
        });
    }

    onUploadDone(filepath)
    {
        let file = this.assembleUploadedFileInfo(filepath);
        this.saveUploadedFileInfo(file).then((response)=>{
            console.log("File saving response")
            console.log(response);
        }).catch((e)=>{
            console.log("error")
            console.log(e)
        })
    }

    onAllFileUploaded()
    {
        location = "/documents"
    }

    assembleUploadedFileInfo(filepath)
    {
        let file = {
            filename: filepath,
            upload_date : Date.now(),
            upload_by : this.config.CURRENT_USER.email
        }

        return file;
    }

    async saveUploadedFileInfo(fileInfo)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let levApi = me.config.LEVENSHTEIN_API;
            let url = levApi + "/documents/create";
            console.log(url)
            console.log(fileInfo);
            $.post(url, JSON.stringify(fileInfo), function (response){
                if(response.success)
                {
                    resolve(response)
                }
                else
                {
                    reject(response)
                }
            })
        })
        return promise;   
    }
}