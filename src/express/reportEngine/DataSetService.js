"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataSetService {
    constructor() {
    }
    getDataSetById(dsId, connection, callback) {
        const preSql = `select a.*, b.name as tableName from TD_DR_META_OBJECT a, TD_DR_PHYSICAL_META_OBJECT b 
        where a.physical_meta_object_id = b.id and a.id = ${dsId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            callback(results[0]);
        });
    }
}
exports.DataSetService = DataSetService;
//# sourceMappingURL=DataSetService.js.map