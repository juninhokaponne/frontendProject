import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/actions/userActions";
import { Button } from "../Button/Button";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Button onClick={() => dispatch(deleteUser(user.id) as any)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
