import react, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUsers, deleteUser, getUsers } from "../fetch_functions/users_fn";
import { addTeams, getTeams, deleteTeam } from "../fetch_functions/teams_fn";
import { getPairs, deletePair } from "../fetch_functions/pair_fn";
import { useForm } from "react-hook-form";
import {
  TeamformOptions,
  UserformOptions,
  PairformOptions,
} from "../data/defaultData";
import { add_pair } from "../fetch_functions/pair_fn";
const Settings = () => {
  const { data: teamData } = useQuery("teams", getTeams);
  const { data: userData } = useQuery("users", getUsers);
  const { data: pairData } = useQuery("pairs", getPairs);

  const {
    register: user_register,
    handleSubmit: user_submit,
    formState: team_state,
  } = useForm(UserformOptions);
  const {
    register: team_register,
    handleSubmit: team_submit,
    formState: user_state,
  } = useForm(TeamformOptions);
  const {
    register: pair_register,
    handleSubmit: pair_submit,
    formState: pair_state,
  } = useForm(PairformOptions);

  const queryClient = useQueryClient();
  const { mutateAsync: addUser } = useMutation(
    (params: any) => addUsers(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["users"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const { mutateAsync: DeleteUser } = useMutation(
    (params: any) => deleteUser(params),
    {
      onSuccess(data) {
        console.log("proradilo");
        queryClient.invalidateQueries(["users"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const { mutateAsync: DeleteTeams } = useMutation(
    (params: any) => deleteTeam(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["pairs"]);
        queryClient.invalidateQueries(["match"]);
        queryClient.invalidateQueries(["teams"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const { mutateAsync: DeletePair } = useMutation(
    (params: any) => deletePair(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["pairs"]);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["match"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const { mutateAsync: addTeam } = useMutation(
    (params: any) => addTeams(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["teams"]);
      },
      onError(err) {
        // console.log(err);
      },
    }
  );
  const { mutateAsync: addPair } = useMutation(
    (params: any) => add_pair(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["pairs"]);
      },
      onError(err) {
        // console.log(err);
      },
    }
  );
  const user_sub = (data: any) => {
    console.log(data.user_name);
    addUser(data.user_name);
  };
  const team_sub = (data: any) => {
    addTeam(data.team_name);
  };
  const pair_sub = (data: any) => {
    addPair({ user_id: data.pair_user, team_id: data.pair_team });
  };
  return (
    <>
      {" "}
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <div className="card">
              <div className="card-header">Teams</div>
              <div className="card-body">
                <form
                  className="input-group mb-3"
                  onSubmit={team_submit(team_sub)}
                >
                  <input
                    type="text"
                    required
                    className="form-control"
                    {...team_register("team_name")}
                    placeholder="Team name"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-success" type="submit">
                      Add Team
                    </button>
                  </div>
                </form>
                <table className="table">
                  <thead>
                    <th scope="col" className="col-10">
                      Name
                    </th>
                    <th scope="col" className="col-2">
                      Options
                    </th>
                  </thead>
                  <tbody>
                    {teamData?.data.map((i: any) => (
                      <tr>
                        <td>{i.name}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              DeleteTeams(i.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header">Users</div>
              <div className="card-body">
                <form
                  onSubmit={user_submit(user_sub)}
                  className="input-group mb-3"
                >
                  <input
                    type="text"
                    className="form-control"
                    required
                    {...user_register("user_name")}
                    placeholder="Players name"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-success" type="submit">
                      Add Player
                    </button>
                  </div>
                </form>
                <table className="table">
                  <thead>
                    <th scope="col" className="col-10">
                      Ime
                    </th>
                    <th scope="col" className="col-2">
                      Opcije
                    </th>
                  </thead>
                  <tbody>
                    {userData?.data.map((i: any) => (
                      <tr>
                        <td>{i.name}</td>
                        <td>
                          <button
                            type="button"
                            onClick={(e: any) => {
                              DeleteUser(i.id);
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">Pairs</div>
              <div className="card-body">
                <form
                  onSubmit={pair_submit(pair_sub)}
                  className="input-group mb-3"
                >
                  <select
                    {...pair_register("pair_user")}
                    className="form-control"
                    style={{ width: "30%" }}
                    required
                  >
                    <option value=""></option>
                    {userData?.data.map((i: any) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                  </select>
                  <select
                    {...pair_register("pair_team")}
                    className="form-control"
                    style={{ width: "30%" }}
                    required
                  >
                    <option value=""></option>
                    {teamData?.data.map((i: any) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                  </select>
                  <div className="input-group-append">
                    <button className="btn btn-success" type="submit">
                      Add Pair
                    </button>
                  </div>
                </form>
                <table className="table">
                  <thead>
                    <th scope="col" className="col-3">
                      Name
                    </th>
                    <th scope="col" className="col-7">
                      Team
                    </th>
                    <th scope="col" className="col-2">
                      Options
                    </th>
                  </thead>
                  <tbody>
                    {pairData?.data.map((i: any) => (
                      <>
                        <tr>
                          <td>{i.user_name}</td>
                          <td>{i.team_name}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                DeletePair(i.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
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
export default Settings;
