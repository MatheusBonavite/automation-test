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
    if (query?.id) {
        const deleteData = await pool.query(
            "DELETE FROM user_info WHERE user_id = $1;",
            [query.id]
        );
        res.status(200).json(deleteData);
    } else {
        res.status(200).json({
            command: undefined,
        });
    }
}
