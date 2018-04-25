import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import { CRUDService } from "../../../service/crud.service";

@Injectable()
export class DatasourceDetailService extends CRUDService {
    constructor(public http: Http) {
        super(http);
        if (process.env.NODE_ENV === "development") {
            this.baseUrl = "/datareport/metadata";
        } else if (process.env.NODE_ENV === "production") {
            this.baseUrl = "/datareport/metadata";
        } else if (process.env.NODE_ENV === "demo") {
            this.baseUrl = "/metadata/metadata";
        }
        this.getRouter = "datasources";//详情页面
        this.updateRouter = "datasources";//修改
    }
  
}