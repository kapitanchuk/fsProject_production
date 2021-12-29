
export default class apiErrors{

    constructor(status,message,errors = []){//те элементы, что мы принимаем
        //super(message)// сообщение из родительского класа(Error)
        this.message = message
        this.errors = errors
        this.status = status
    }

    static unAuthorized(){
       return new apiErrors(403,'unauthorized') 
    }


    static BadRequest(message,errors=[]){

        return new apiErrors(400,message,errors)
    }

    static InvalidToken(message){
        return new apiErrors(401,message)
    }
}

