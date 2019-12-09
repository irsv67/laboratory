
export class DataSourceService {
    constructor() {
    }

    initRouter(router, connection) {
        const that = this;

        // create
        router.post('/createDataSource', function (req, res) {
            const user = req.headers['dr-user'];
            const tenant = req.headers['dr-tenant'];
            const paramObj = req.body;
            const preSql = `
            insert into TD_DR_DATA_SOURCE (name, type, attr1, status, 
                tenant_id, creator, create_by, updater, update_by) values (?)`;

            const values = [paramObj.name, paramObj.type, paramObj.url || '0.x', paramObj.status,
                tenant, user, user, user, user];

            connection.query(preSql, [values], function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                res.send({
                    code: 200,
                    msg: '修改成功',
                    success: true,
                });
            });
        });

        // update
        router.put('/createDataSource', function (req, res) {
            const user = req.headers['dr-user'];
            const tenant = req.headers['dr-tenant'];
            const paramObj = req.body;

            const preSql = `
            UPDATE
                TD_DR_DATA_SOURCE
            SET
                name = '${paramObj.name}',
                type = '${paramObj.type}',
                attr1 = '${paramObj.url}',
                status = '${paramObj.status}',

                tenant_id = '${tenant}',
                updater = '${user}',
                update_by = '${user}'
            WHERE
                id = ${paramObj.id}`;

            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                res.send({
                    code: 200,
                    msg: '修改成功',
                    success: true,
                });
            });
        });

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

        router.delete('/deleteDataSource/:dsId', function (req, res) {
            const dsId = req.params.dsId;
            const preSql = `delete from TD_DR_DATA_SOURCE where id = ${dsId}`;
            connection.query(preSql, function (error, results, fields) {
                if (error) throw error;
                console.log(preSql);
                res.send({
                    code: 200,
                    msg: '删除成功'
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
