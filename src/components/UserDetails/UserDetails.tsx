import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(id) as any);
    }
  }, [dispatch, id]);

  if (!currentUser) return <p>Loading user details...</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default UserDetails;
