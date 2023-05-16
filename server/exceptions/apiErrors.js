
export default class apiErrors{

    constructor(status,message,errors = [],originalReq){//те элементы, что мы принимаем
        //super(message)// сообщение из родительского класа(Error)
        
        this.originalReq = originalReq
        this.message = message
        this.errors = errors
        this.status = status
    }

    static unAuthorized(originalReq){
       return new apiErrors(401,'unauthorized','',originalReq) 
    }

    static BadRequest(message,errors=[]){
        return new apiErrors(400,message,errors)
    }

    static InvalidToken(message){
        return new apiErrors(403,message)
    }
}

