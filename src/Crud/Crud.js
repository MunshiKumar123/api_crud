// e drive .net folder then project under interview test
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
function Crud() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editdata, setEditdata] = useState({});

  // fetch api function
  const fetch = () => {
    axios("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // api call in use Effect
  useEffect(() => {
    fetch();
  }, []);

  // data delete from api
  const handleDelete = (id) => {
    debugger;
    const rcds = data.filter((item, index) => {
      return id !== index;
    });
    setData(rcds);
  };

  //edit data from api

  const handleEdit = (id) => {
    const val = data.find((item, index) => {
      return id === item.id;
    });
    setEditdata(val);
    setToggle(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditdata({ ...editdata, [name]: value });
  };

  const handleUpdate = () => {
    setData(
      data.map((e) => {
        if (e.id === editdata.id) {
          return {
            ...e,
            body: editdata.body,
            title: editdata.title,
            userId: editdata.userId,
          };
        } else {
          return e;
        }
      })
    );
    setToggle(false);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {toggle && (
              <div className="m-2 d-flex align-items-center justify-content-between">
                <input
                  className="form-control mx-2"
                  placeholder="edit"
                  name="body"
                  value={editdata.body}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <input
                  className="form-control mx-2"
                  placeholder="edit"
                  name="title"
                  value={editdata.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <input
                  className="form-control mx-2"
                  placeholder="edit"
                  name="userId"
                  value={editdata.userId}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            )}

            <table className="table table-bordered">
              <tr>
                <th>Seq No.</th>
                <th>User Body</th>
                <th>User Title</th>
                <th>UserId</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}.</td>
                        <td>{item.body}</td>
                        <td>{item.title}</td>
                        <td>{item.userId}</td>
                        <td>
                          <button onClick={() => handleDelete(index)}>
                            {" "}
                            Delete{" "}
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleEdit(item.id)}>
                            Edit{" "}
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Crud;
