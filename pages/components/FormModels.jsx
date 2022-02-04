import { Button, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormField } from "../../components/UI/lib/Form";
import FormFields from "./FormFields";
import FormRelationShips from "./FormRelationShips";

export default function FormModels({ models, form: { loading } }) {
  const [modelIndex, setModelIndex] = useState(models.length - 1);
  const currentEditModel = models[modelIndex];
  return (
    <>
      <FormField name={`models.${modelIndex}.name`}>Name</FormField>
      <FormFields modelIndex={modelIndex} />
      <hr className="mt-6 mb-6" />
      <FormRelationShips
        otherModels={models.filter((m) => m.name !== currentEditModel?.name)}
        modelIndex={modelIndex}
      />

      <Button type="submit" className="mt-2" isLoading={loading}>
        Submit
      </Button>
    </>
  );
}
