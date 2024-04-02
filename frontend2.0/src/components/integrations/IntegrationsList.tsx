"use client";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";

export type Data = {
  suggestion: String;
  tokens_saved: Number;
  carbon_saved: Number;
  water_saved: Number;
};

function isValidGithubRepoUrl(url: string): boolean {
  return url.includes("github.com");
}

const TableOne = (props: any) => {
  let [projectData, setProjectData] = React.useState<Data[]>([]);
  let [esg, setEsg] = React.useState<number>(0);
  let [error, setError] = React.useState<string>("");

  let [githubLink, setGithubLink] = React.useState<string>("");

  let [loading, setLoading] = React.useState<boolean>(false);

  let project = props.project;

  async function returnSuggestions() {
    try {
      let response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/api/projects/suggestions/" +
          project,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        console.log("error");
        return;
      }
      let data = await response.json();
      setProjectData(data["suggestions"]);
      setEsg(data["esg"]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    returnSuggestions();
  }, []);

  async function getSuggestions() {
    try {
      setLoading(true);
      let response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/projects/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_link: githubLink,
            project_id: project,
          }),
        }
      );

      let data = await response.json();

      if (response.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }

      console.log(data);

      data = data.suggestions;

      let suggestions = data.Suggestions;
      console.log(suggestions);

      let tokens = data.Tokens;

      tokens = tokens.map((token: any) => Number(token));

      let carbon = tokens.map(
        (token: any) => Math.round(100 * token * 0.02406) / 100
      );
      let water = tokens.map(
        (token: any) => Math.round(token * 0.4226 * 100) / 100
      );

      setEsg(data.Rating);

      let json = suggestions.map((suggestion: any, index: number) => {
        return {
          suggestion: suggestion,
          tokens_saved: tokens[index],
          carbon_saved: carbon[index],
          water_saved: water[index],
        };
      });

      setProjectData(json);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function handleGithubLink(e: any) {
    let link = e.target.value;

    if (!isValidGithubRepoUrl(link)) {
      setError("Invalid Github Repo URL");
      return;
    }
    setGithubLink(link);
  }

  if (loading) {
    return (
      <div className="rounded-sm p-5 border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl p-5 font-semibold text-black dark:text-white">
          Loading...
        </h4>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-stroke dark:border-strokedark"></div>
        </div>
      </div>
    );
  }

  if (projectData.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-white  px-5 shadow-default dark:border-strokedark dark:bg-boxdark py-6">
        <input
          onChange={(e) => handleGithubLink(e)}
          type="text"
          name="link"
          id="link"
          className="w-full p-2 border border-stroke dark:border-strokedark rounded-sm my-4"
        />

        <button
          onClick={getSuggestions}
          className="flex mx-auto bg-slate-700 text-white font-bold py-4 px-4 rounded hover:bg-slate-900"
        >
          <h3 className="font-medium uppercase xsm:text-base">
            Get Suggestions
          </h3>
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">Top Suggestions</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Suggestion
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tokens Saved
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Carbon Saved
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Water Saved
            </h5>
          </div>
        </div>

        {projectData.map((row, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === projectData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-4 p-2.5 xl:p-5 text-wrap">
              <div className="text-wrap">{row.suggestion.toString()}</div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-black">
                {row.tokens_saved.toString()}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-black">
                {row.carbon_saved.toString()}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-black">
                {row.water_saved.toString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
