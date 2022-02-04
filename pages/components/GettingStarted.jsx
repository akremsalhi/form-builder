import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoCodeDownloadOutline } from "react-icons/io5";
import { FormFetch } from "../../components/Context/FormFetch";
import { FormField } from "../../components/UI/lib/Form";
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
      <div className="mt-4 space-y-4">
        <h1 className="text-xl">Getting started</h1>
        <div>
          <FormFetch action="/api/init" method="POST">
            {({ loading }) => {
              return (
                <>
                  <FormField name="name" feedback="Enter project name">
                    Project
                  </FormField>
                  <FormField name="backend" feedback="Enter Backend directory">
                    Backend
                  </FormField>
                  <FormField
                    name="frontend"
                    feedback="Enter frontend directory"
                  >
                    Frontend
                  </FormField>

                  <Button
                    className="mt-4"
                    type="submit"
                    colorScheme="blue"
                    leftIcon={<IoCodeDownloadOutline className="text-3xl" />}
                  >
                    Init project
                  </Button>
                </>
              );
            }}
          </FormFetch>
          {/* <Button
            className="flex items-center"
            colorScheme="teal"
            leftIcon={<IoCodeDownloadOutline className="text-3xl" />}
            onClick={initProject}
            isLoading={loading}
          >
            Init project
          </Button> */}
        </div>
      </div>
    </>
  );
}
