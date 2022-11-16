import react from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { getTeams } from "../fetch_functions/teams_fn";
import { MatchesformOptions } from "../data/defaultData";
import {
  getMatches,
  addMatches,
  deleteMatch,
} from "../fetch_functions/matches_fn";
import { useState } from "react";

const Results = () => {
  const { data: teamData } = useQuery("teams", getTeams);
  const { data: matchData } = useQuery("match", getMatches);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState } =
    useForm(MatchesformOptions);
  const [match, setMatch] = useState({
    first_team: "",
    second_team: "",
    first_score: 0,
    second_score: 0,
  });
  const { mutateAsync: addMatch } = useMutation(
    (params: any) => addMatches(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["match"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const { mutateAsync: DeleteMatch } = useMutation(
    (params: any) => deleteMatch(params),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["match"]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const { errors } = formState;
  const onSubmit = (data: any) => {
    addMatch(data);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">Results</div>
              <div className="card-body">
                <form
                  className="input-group mb-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <select
                    required
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    {...register("first_team_id")}
                    style={{ width: "30%" }}
                  >
                    <option value=""></option>
                    {teamData?.data.map((i: any) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                  </select>
                  <select
                    {...register("second_team_id")}
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    style={{ width: "30%" }}
                  >
                    <option value=""></option>
                    {teamData?.data.map((i: any) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                  </select>

                  <input
                    required
                    type="text"
                    {...register("first_team_score")}
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                  />
                  <input
                    required
                    type="text"
                    {...register("second_team_score")}
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </form>
                <table className="table">
                  <thead>
                    <th scope="col">Team 1</th>
                    <th scope="col">Team 2</th>
                    <th scope="col">Score</th>
                    <th scope="col">Score</th>
                    <th scope="col">Options</th>
                    <th scope="col"></th>
                  </thead>
                  <tbody>
                    {matchData?.data.map((i: any) => {
                      let name = "bg-primary text-white";
                      let name2 = "bg-primary text-white";
                      if (i.first_team_score > i.second_team_score) {
                        name = "bg-success text-white";
                        name2 = "bg-danger text-white";
                      }
                      if (i.first_team_score < i.second_team_score) {
                        name2 = "bg-success text-white";
                        name = "bg-danger text-white";
                      }

                      return (
                        <>
                          <tr>
                            <td>
                              {i.first_team_name} ({i.first_team_user})
                            </td>
                            <td>
                              {i.second_team_name} ({i.second_team_user})
                            </td>
                            <td className={name}>{i.first_team_score}</td>
                            <td className={name2}>{i.second_team_score}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => {
                                  DeleteMatch(i.id);
                                }}
                              >
                                Delete match
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
        </div>
      </div>
    </>
  );
};
export default Results;
