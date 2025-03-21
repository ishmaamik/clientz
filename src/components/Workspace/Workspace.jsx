import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Split from "react-split";
import { toast } from "react-toastify";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";

function Workspace() {
  const urlPathname = window.location.pathname;
  const segments = urlPathname.split("/");
  const problemId = segments[segments.length - 1];

  const [details, setDetails] = useState({});
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);

  const testcases = details.testcases;

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`https://serverz-78ek.onrender.com/problem/${problemId}`);
        console.log(response.data); // Check if the response structure matches expectations
        setDetails(response.data); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching problem details:", error);
        toast.error("Failed to load problem details");
      }
    }

    fetchDetails();
  }, [problemId]);
  
  const onChange = (data) => {
    setCode(data);
  };

  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: 63,
      source_code: btoa(code),
      stdin: btoa(details?.testcases[0].input),
    };

    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      const token = response.data.token;
      checkStatus(token);
    } catch (error) {
      console.log(error);
    }
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = await response.data.status_id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        const output = atob(response.data.stdout);
        const reqOutput = details.testcases[0].output;

        if (output.trim() == reqOutput.trim()) {
          toast.success("Congrats! TestCase Passesd");
        } else {
          toast.error("Oops! Output Didn't Matched");
        }
        setProcessing(false);
        return;
      }
    } catch (error) {
      setProcessing(false);
      console.log(error);
    }
  };

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription details={details} />
      <Split className="split-vertical" direction="vertical">
        <CodeEditor onChange={onChange} />
        <TestCases
          handleCompile={handleCompile}
          testcases={testcases}
          processing={processing}
        />
      </Split>
    </Split>
  );
}

export default Workspace;