import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useSelector } from "react-redux";
import { selectUserIds } from "./usersApiSlice";
// destructures the data from getUsersQuery
const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const userIDs = useSelector((state) => selectUserIds(state));
  const userID = userIDs[0];
  let content;
  // if is loading then put a loading para
  if (isLoading) content = <p>Loading...</p>;
  /// if there is an error write the error message
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  // if it is successful
  if (isSuccess) {
    // destructure the ids from the users data, we could destructure the entities here as well
    const { ids } = users;
    /// check there are ids and then map over each id and pass in the userID
    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersList;
