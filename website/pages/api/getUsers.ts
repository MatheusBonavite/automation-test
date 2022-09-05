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
    user_id?: number;
    user_name?: string;
    user_password?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = req?.query;
    if (query?.name) {
        const dbData = await pool.query(
            "SELECT * FROM user_info WHERE user_name = $1;",
            [query.name]
        );
        if (dbData?.rows?.length > 0) res.status(200).json(dbData?.rows?.[0]);
        else {
            res.status(200).json({
                user_id: undefined,
                user_name: undefined,
                user_password: undefined,
            });
        }
    } else {
        //Would probably remove this on a production code!
        const dbData = await pool.query("SELECT * FROM user_info;");
        res.status(200).json(dbData.rows);
    }
}
