import knex from "knex";


export const database = knex({
    client: "sqlite3",
    connection: {filename: "./db/products.sqlite"}
})

export const database_mysql = knex({
    client: "mysql",
    version: "10.4.14",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password :"",
        database: "coderecommerce"
    },
    pool: {min:0,max:10}
})
