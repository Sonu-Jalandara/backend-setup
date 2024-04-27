 class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong ",
        errors=[],
        statck=""
    ){
        super( message)
        this.statusCode=statusCode,
        this.data=null,
        // assignment - explore this.data  field
        this.message = message,
        this.errors = errors,
        this.success = false


        if(statck){
            this.stack = statck
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
 }

 export { ApiError }