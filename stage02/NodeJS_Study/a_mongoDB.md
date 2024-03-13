-   专为nodejs设计的数据库（键值对数据库）
-   一条记录叫文档（document）, 类似JSON格式。文档必须包含 _id属性为主键，文档存储在集合collection中
-   使用
    - 安装MongoDB数据库， 使用mongod启动数据库
    - 安装node驱动库
    > npm install mongodb

- 脚本代码中使用mongoDB
    - 引入mongodb模块驱动，使用模块的MongoClient实例，实例链接数据库地址，同时监听回调
    - 连接数据库  
    `MongoClient.connct(url, (err, db) => {
        assert.equal(null, err);
        console.log('Connected correctly to server.');
        db.close();
    })`
    - 插入数据库  
    `db.collection('restaurants').insertOne({
        // 单条数据内容提供
    })` 插入数据库的行为要放到连接数据库的回调中执行
    - 查询操作 db.collection('restaurants').find()  如果find参数为空，则查询集合的所有文档，参数为
    一条文档的一个kye:value json数据则可查询 | 嵌套属性查询（对象属性嵌套查询） | 指定数组的一个值  
    | 指定运算符 | 指定逻辑运算 | sort方法排序，1升序， -1降序
    - 更新 updateOne() updateMany() replaceOne() 替换整个文档(更换一条数据)
    - 删除 deleteMany() 根据指定key:value删除符合条件的所有文档 | deleteOne() 删除某一条
    - 聚合操作 aggregate() 将数据库查询结果按照自定义格式输出 【查询的一种方式】
    - 索引 createIndex()  生成单字段的索引，1表示升序， -1降序
- Mongoose
    - 多种中间件可以用于连接 nodejs和mongodb, mongoose比较常用
    - npm install mongoose --save
    - require('mongoose').connect('mongodb://localhost/mydatabase')  // 连接字符串格式为mongodb://主机/数据库名
    - 连接后，可以对open和error事件监听
    - mongoose.Schema对象，可以用来定义 数据库的组织方式和存储的数据结构
        
