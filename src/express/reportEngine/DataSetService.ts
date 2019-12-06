
export class DataSetService {

    constructor() {
    }

    initRouter(router, connection) {
        const that = this;

        router.get('/retrieveDataSourceList', function (req, res) {
            const preSql = `select * from TD_DR_DATA_SOURCE order by create_time desc`;
            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                list.forEach(item => {
                    item['url'] = item['attr1'];
                });
                res.send({
                    code: 200,
                    data: list,
                    msg: '查询成功'
                });
            });
        });

        router.get('/retrieveMetadataList', function (req, res) {
            const preSql = `select a.*, c.name as dataSourceName, c.type as dataSourceType 
            from TD_DR_META_OBJECT a, TD_DR_PHYSICAL_META_OBJECT b, TD_DR_DATA_SOURCE c 
            where a.physical_meta_object_id = b.id and b.datasource_id = c.id 
            order by a.create_time desc`;
            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                res.send({
                    code: 200,
                    data: list,
                    msg: '查询成功'
                });
            });
        });

        router.get('/findMetaById', function (req, res) {
            const metaId = req.query.metaId;
            const preSql = `select a.*, b.name as physicalMetaObjectName, 
            c.id as dataSourceId, c.name as dataSourceName, c.type as dataSourceType 
            from TD_DR_META_OBJECT a, TD_DR_PHYSICAL_META_OBJECT b, TD_DR_DATA_SOURCE c 
            where a.physical_meta_object_id = b.id and b.datasource_id = c.id  and a.id = ${metaId}`;
            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                const item = list[0];
                item['metaObjectName'] = item['name'];

                const sql = `select * from TD_DR_META_ATTRIBUTE where object_id = ${metaId}`;
                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    console.log(preSql);
                    const list = that.convertResponse(results);
                    list.forEach(item => {
                        item['metaAttributeName'] = item['name'];
                    });
                    item['attributes'] = list;

                    res.send(item);
                });
            });
        });

        router.get('/getCubeList', function (req, res) {
            const preSql = `select a.*, b.name as tableName, c.type as dataSourceType 
            from TD_DR_META_OBJECT a, TD_DR_PHYSICAL_META_OBJECT b, TD_DR_DATA_SOURCE c 
            where a.physical_meta_object_id = b.id and b.datasource_id = c.id 
            order by a.create_time desc`;
            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                res.send({
                    code: 200,
                    data: results,
                    total: results.length,
                    msg: '查询成功'
                });
            });
        });

        router.get('/getCubeAttr', function (req, res) {
            const cubeId = req.query.cubeId;

            const preSql = `select * from TD_DR_META_ATTRIBUTE where object_id = ${cubeId}`;
            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                list.forEach(item => {
                    item['metaAttributeName'] = item['name'];
                });
                res.send({
                    code: 200,
                    data: list,
                    msg: '查询成功'
                });
            });
        });
    }

    convertResponse(results) {
        const list = results.map(item => {
            const tmpObj = {};
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const value = item[key];
                    const keyNew = key.replace(/\_(\w)/g, function (all, letter) {
                        return letter.toUpperCase();
                    });
                    tmpObj[keyNew] = value;
                }
            }
            return tmpObj;
        })
        return list;
    }
}