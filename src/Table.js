import React, { useState, useEffect } from "react";

const Table = ({ users }) => {
  const [sortedUsers, updateSortedUsers] = useState([]);
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: "descend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%", order: "descend" },
      { name: "name", width: "10%", order: "descend" },
      { name: "phone", width: "20%", order: "descend" },
      { name: "email", width: "20%", order: "descend" },
      { name: "dob", width: "10%", order: "descend" }
    ]
  });
  useEffect(() => updateSortedUsers(users), [users]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th
              scope="col"
              onClick={(heading) => {
                console.log ("Hello")
                let current = developerState.headings
                .filter(data => data.name === heading)
                .map(data => data.order)
                .toString()

                if (current === "descend") {
                  current = "ascend"
                } 
                else {current = "descend"}

                const compare = (a,b) => {
                  if (current === "ascend") {
                    if (a[heading] === undefined 
                    ) {
                      return 1
                    } else if (b[heading] === undefined
                      ) {
                        return -1
                      } else if (heading === "first") {
                        return a[heading].first.localeCompare(b[heading].first)
                      } else if (heading === "last") {
                        return a[heading].last -b[heading].last
                      } else {return a[heading].localeCompare(b[heading])}
                  } else {
                    if (a[heading] === undefined 
                      ) {
                        return 1
                      } else if (b[heading] === undefined
                        ) {
                          return -1
                        } else if (heading === "first") {
                          return b[heading].first.localeCompare(a[heading].first)
                        } else if (heading === "last") {
                          return b[heading].last -a[heading].last
                        } else {return b[heading].localeCompare(a[heading])}
                  }

                }
                const sortedUsers = developerState.filteredUsers.sort (compare)
                const updateHeadings = developerState.headings.map (data => {
                  data.order = data.name === heading ? current: data.order;
                  return data
                })
              }}
            >
              First
            </th>
            <th scope="col">Last</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Cell</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
            <th scope="col">Postcode</th>
            <th scope="col">Picture</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(
            ({
              location: { city, state, country, postcode },
              picture: { thumbnail },
              cell,
              phone,
              gender,
              email,
              name: { first, last, title }
            }) => (
              <tr key={email}>
                <td>{title}</td>
                <th>{first}</th>
                <td>{last}</td>
                <td>{gender}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{cell}</td>
                <td>{city}</td>
                <td>{state}</td>
                <td>{country}</td>
                <td>{postcode}</td>
                <td>
                  <img src={thumbnail} />
                </td>

                <td></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};



export default Table;