import { Injectable } from "@angular/core";

import { CRUDService } from "../../../service/crud.service";
import { Http } from "@angular/http";
import { StoreModule, Store } from 'ng-cosmos-td-common';
import { Observable } from 'rxjs/Observable';
interface AppState { msg: any;}
@Injectable()
export class DatasourceCreateService extends CRUDService {
    hasSaved: boolean = false;
    constructor(public http: Http,private store: Store<AppState>,) {
        super(http);
        if (process.env.NODE_ENV === "development") {
            this.baseUrl = "/datareport/metadata";
        } else if (process.env.NODE_ENV === "production") {
            this.baseUrl = "/datareport/metadata";
        } else if (process.env.NODE_ENV === "demo") {
            this.baseUrl = "/metadata/metadata";
        }
        this.saveRouter = "datasources";//保存
        this.updateRouter="datasources";//修改数据
        this.getRouter="datasources";//获取

        this.msg$ = store.select('msg');
        this.msg$.subscribe((data:any) => {
            this.msg = data;
        })
    }
    msg: Object;
    msg$: Observable<any>;
    public test(data: any): Promise<any> {
        let url = `${this.baseUrl}/testConnect`;
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }//测试

}