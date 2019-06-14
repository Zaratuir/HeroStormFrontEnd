import axios from 'axios';
import settings from './application.json';

class APIService {
    defaultHost;
    defaultPort;
    defaultRefreshURL;
    authorizationHeader;
    refreshTokenHeader;
    defaultProtocol;

    constructor(defaultHost, defaultPort, defaultProtocol, defaultRefreshURL){
        this.defaultHost = (defaultHost == null ? settings.APISite : defaultHost);
        this.defaultPort = (defaultPort == null ? settings.APIPort : defaultPort);
        this.defaultProtocol = (defaultProtocol == null ? settings.APIProtocol : defaultProtocol);
        this.defaultRefreshURL = (defaultRefreshURL == null ? settings.RefreshURL : defaultRefreshURL);

        this.GET = this.GET.bind(this);
        this.POST = this.POST.bind(this);
        this.PUT = this.PUT.bind(this);
        this.DELETE = this.DELETE.bind(this);
        this._processErrorIntercept = this._processErrorIntercept.bind(this);
        this._processResponseIntercept = this._processResponseIntercept.bind(this);
        this._processRequest = this._processRequest.bind(this);
        this._sendAxiosRequest = this._sendAxiosRequest.bind(this);
        this._setHeaders = this._setHeaders.bind(this);
        this._setAuthHeaders = this._setAuthHeaders.bind(this);
        this._getBaseURL = this._getBaseURL.bind(this);
        this._getHost = this._getHost.bind(this);
        this._getPort = this._getPort.bind(this);

        axios.interceptors.response.use(this._processResponseIntercept, this._processErrorIntercept);
    }

    GET(resource, headers, successCallback, rejectCallback, host, port){
        if(resource == null){
            throw new Error("Invalid resource. Must be a string beginning with /");
        }
        if(typeof successCallback != "function"){
            throw new Error("Invalid success callback. Must be a function.");
        }
        if(typeof rejectCallback != "function"){
            throw new Error("Invalid rejection callback. Must be a function.");
        }

        let config = this._setHeaders(headers);

        config.url = resource;
        config.baseURL = this._getBaseURL(host,port);
        config.method = "get";

        this._sendAxiosRequest(config, successCallback, rejectCallback);
    }

    POST(resource, data, headers, successCallback, rejectCallback, host, port){
        if(resource == null || typeof data != "object" || typeof successCallback != "function" || typeof rejectCallback != "function"){
            throw new Error("Invalid input params. Resource must not be null, data must be an object, and callback must be a function.");
        }

        let config = this._setHeaders(headers);
        
        config.baseURL = this._getBaseURL(host,port);
        config.url = resource;
        config.data = data;
        config.method = "post";

        this._sendAxiosRequest(config,successCallback, rejectCallback);
    }

    PUT(resource, data, headers, successCallback, rejectCallback, host, port){
        if(resource == null || typeof data != "object" || typeof successCallback != "function" || typeof rejectCallback != "function"){
            throw new Error("Invalid input params. Resource must not be null, data must be an object, and callback must be a function.");
        }

        let config = this._setHeaders(headers);

        config.baseURL = this._getBaseURL(host,port);
        config.url = resource;
        config.data = data;
        config.method = "put";

        this._sendAxiosRequest(config,successCallback, rejectCallback);
    }

    DELETE(resource, headers, successCallback, rejectCallback, host, port){
        if(resource == null || typeof successCallback != "function" || typeof rejectCallback != "function"){
            throw new Error("Invalid input params. Resource must not be null, and callback must be a function.");
        }

        let config = this._setHeaders(headers);

        config.baseURL = this._getBaseURL(host,port);
        config.url = resource;
        config.method = "delete";
        
        this._sendAxiosRequest(config,successCallback, rejectCallback);
    }

    _sendAxiosRequest(config, callback){
        if(config.headers.AuthorizationType === "Basic"){
            config.auth = {
                
            }
        }
        axios(config)
            .then(this._processRequest, this._processReject);
    }

    _processRequest(data){
        console.log(data);
        return data;
    }

    _processReject(reject){
       
    }

    _processResponseIntercept(response){
        console.log(response);
        if(response.headers.authorization != null){
            this.authorizationHeader = response.headers.authorization;
        }
        if(response.headers.refreshtoken != null){
            this.refreshTokenHeader = response.headers.refreshtoken;
        }
        return response.data;
    }

    _processErrorIntercept(error){
        console.log(error.request);
        console.log(error.data);
        for(let i in error){
            console.log(i);
            console.log(error[i]);
        }
        if(error.request.status === 403 && !error.request.responseURL.endsWith("/Users/Validate")){
            
        }
        return Promise.reject(error);
    }

    _getHost(host){
        return (host == null ? this.defaultHost : host)
    }
    _getPort(port){
        return (port == null ? this.defaultPort : port);
    }

    _setHeaders(headers){
        if(typeof headers != "object"){
            throw new Error("Invalid Header Object");
        }
        if(headers.AuthorizationType === "Basic"){
            delete headers.AuthorizationType;
            let username = headers.username;
            let password = headers.password;
            delete headers.username;
            delete headers.password;
            return {
                headers: headers,
                auth: {
                    username: username,
                    password: password
                }
            }
        }
        if(headers.Authorization == null && this.authorizationHeader != null){
            headers.Authorization = this.authorizationHeader;
        }

        return { headers : headers };
    }

    _setAuthHeaders(response){
        if(response.headers.authorization != null){
            this.authorizationHeader = response.headers.authorization;
        }
        return new Promise(function(resolve,reject){
            resolve(response);
        });
    }

    _getBaseURL(host,port){
        host = this._getHost(host);
        port = this._getPort(port);
        return this.defaultProtocol + host + ":" + port;
    }
}

export const apiService = new APIService();