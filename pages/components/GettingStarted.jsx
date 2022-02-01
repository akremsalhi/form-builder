import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoCodeDownloadOutline } from "react-icons/io5";
import { jsonFetch } from "../../helpers/functions/api";

export default function GettingStarted() {
  const [loading, setLoading] = useState(false);
  const initProject = async () => {
    setLoading(true);
    await jsonFetch("/api/init");
    setLoading(false);
  };
  return (
    <>
      <h1 className="text-xl">Getting started</h1>
      <div className="mt-4">
        <Button
          className="flex items-center"
          colorScheme="teal"
          leftIcon={<IoCodeDownloadOutline className="text-3xl" />}
          onClick={initProject}
          isLoading={loading}
        >
          Init project
        </Button>
      </div>
    </>
  );
}
