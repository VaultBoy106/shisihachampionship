import axios from "axios";
import react from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getUsers,
  getUserTeams,
  addAditoinalScore,
} from "../fetch_functions/users_fn";
import "../styles/loader.css";
const Main = () => {
  const { data: userData, isLoading, isError } = useQuery("users", getUsers);
  const { data: userTeamsData } = useQuery("getUsers", getUserTeams);
  const queryClient = useQueryClient();
  const { mutateAsync: AditionalScore } = useMutation(
    (params: any) => addAditoinalScore(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["users"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  if (isLoading) {
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }
  if (isError) {
    return <h1>Errror</h1>;
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">Table</div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <th scope="col">#</th>
                    <th scope="col">Player</th>
                    <th scope="col">Points</th>
                    <th scope="col">Aditional Score</th>
                    <th scope="col"></th>
                  </thead>
                  <tbody>
                    {userData?.data.map((user: any, idx: number) => (
                      <tr>
                        <>
                          <td>{idx + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.score}</td>
                          <td>{user.additional_core}</td>
                        </>

                        <td>
                          {" "}
                          <div className="btn-group mr-2" role="group">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                AditionalScore({
                                  id: user.id,
                                  additional_core: user.additional_core + 1,
                                });
                              }}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                AditionalScore({
                                  id: user.id,
                                  additional_core: user.additional_core - 1,
                                });
                              }}
                            >
                              -
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">Teams</div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <th scope="col">Player</th>
                    <th scope="col">Team</th>
                  </thead>
                  <tbody>
                    {userTeamsData?.data.map((i: any) => {
                      console.log(i);
                      return (
                        <tr>
                          <td>{i.name}</td>
                          <td>
                            {i.teams.map(
                              (name: string, idx: number, teams: any) => {
                                if (idx == teams.length) {
                                  return name;
                                }
                                return `${name} `;
                              }
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
