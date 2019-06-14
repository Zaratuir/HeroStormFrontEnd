import {apiService} from '../resources/APIService';
import {dispatcher} from '../resources/Dispatcher';

class loginControllerClass{
    apiService;
    constructor(APIService){
        this.apiService = APIService;
    }

    loginUser(credentials){
        this.apiService.POST("/Users/Validate",{},{AuthorizationType:"Basic",username:credentials.username, password:credentials.password}, (response) => {console.log(response)}, (reject) => {console.log(reject)});
    }

    successResponse(response){
        dispatcher.dispatch(response);
    }

    failedResponse(){

    }

}

export const loginController = new loginControllerClass(apiService);