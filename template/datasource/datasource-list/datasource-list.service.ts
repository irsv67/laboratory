import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import { CRUDService } from "../../../service/crud.service";

@Injectable()
export class DatasourceListService extends CRUDService {
    constructor(public http: Http) {
        super(http);
        //根据不同环境配置不同 URL
        if (process.env.NODE_ENV === "development") {
            this.baseUrl = "/datareport/metadata";
        } else if (process.env.NODE_ENV === "production") {
            this.baseUrl = "/datareport/metadata";
        } else if (process.env.NODE_ENV === "demo") {
            this.baseUrl = "/metadata/metadata";
        }
        this.saveRouter = "datasources";//保存
        this.queryRouter = "datasources/rows";//列表查询
        this.getRouter = "datasources";//详情页面
        this.updateRouter = "datasources";//修改
    }
  
}