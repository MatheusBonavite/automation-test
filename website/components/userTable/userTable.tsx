import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { StyledTable } from "./useTable.style";

type UserTableProps = {
    users: {
        user_id?: number;
        user_name?: string;
    }[];
};
const UserTable: FunctionComponent<UserTableProps> = ({ users }) => {
    const router = useRouter();
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {users.map((child, index) => {
                    return (
                        <tr key={index}>
                            <td id={`to_delete_${index}`}>
                                {child?.user_id || ""}
                            </td>
                            <td>{child?.user_name || ""}</td>
                            <td
                                onClick={async () => {
                                    const idToDelete = document?.getElementById(
                                        `to_delete_${index}`
                                    )?.innerText;
                                    const res = await fetch(
                                        `http://localhost:3000/api/deleteUser?id=${idToDelete}`
                                    )
                                        .then(
                                            (response) => response?.json() || ""
                                        )
                                        .then((data) => data);
                                    if (res?.command === "DELETE") {
                                        router.push("/list-users");
                                    }
                                }}>
                                Delete
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </StyledTable>
    );
};

export { UserTable };
