import React, { useEffect, useState } from 'react';
import { dynamodb, USERS_TABLE } from './awsConfig';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dynamodb.scan({ TableName: USERS_TABLE }, (err, data) => {
      if (err) console.error(err);
      else setUsers(data.Items);
    });
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(u => (
          <li key={u.email}>{u.email} - Last login: {u.lastLogin}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
