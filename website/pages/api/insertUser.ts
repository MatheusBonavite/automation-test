import type { NextApiRequest, NextApiResponse } from "next";
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    database: "postgres",
    password: "from_docker",
    port: 5432,
    host: "localhost",
});

type Data = {
    command?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = req?.query;
    if (query?.name && query?.password) {
        const deleteData = await pool.query(
            "INSERT INTO user_info(user_id, user_name, user_password) VALUES (DEFAULT, $1, $2);",
            [query.name, query.password]
        );
        res.status(200).json(deleteData);
    } else {
        res.status(200).json({
            command: undefined,
        });
    }
}
