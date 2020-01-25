import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpPostService {

    constructor(private http: HttpClient) { }

    postData(data: any, serverUrl: string) {
        let options = this.createRequestOptions();
        return this.http.post(/*url*/serverUrl, /*body*/data, /*options*/{ headers: options });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
}