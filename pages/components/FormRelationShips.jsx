import {
  Box,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { FormArray, useFieldArray } from "../../components/Context/FormFetch";
import Icon from "../../components/UI/Icon";
import { FormField } from "../../components/UI/lib/Form";
import { relationDefault, relationships } from "../../values/values";
import { RelationProvider, RelationSetting } from "../partials/model";

export default function FormRelationShips({ otherModels, modelIndex }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-xl font-medium">Relation ships</h3>

      <FormArray name={`models.${modelIndex}.relationships`}>
        <ModelRelations otherModels={otherModels} modelIndex={modelIndex} />
      </FormArray>
    </div>
  );
}

const ModelRelations = ({ otherModels, modelIndex }) => {
  const { array: relations, push, remove } = useFieldArray();

  return (
    <>
      <Box>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Icon name="plus" size="20" />}
          onClick={() => push(relationDefault)}
        >
          Relation
        </Button>
      </Box>
      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Class</Th>
            <Th>_</Th>
          </Tr>
        </Thead>
        <Tbody>
          {relations.map((relation, i) => (
            <Tr key={i}>
              <Td>
                <FormField
                  name={`models.${modelIndex}.relationships.${i}.name`}
                ></FormField>
              </Td>
              <Td>
                <FormField
                  type="select"
                  name={`models.${modelIndex}.relationships.${i}.type`}
                  options={relationships.map((r) => ({
                    label: r.name,
                    value: r.name,
                  }))}
                ></FormField>
              </Td>
              <Td>
                <FormField
                  type="select"
                  name={`models.${modelIndex}.relationships.${i}.class`}
                  options={otherModels.map(({ name }) => ({
                    label: name,
                    value: name,
                  }))}
                ></FormField>
              </Td>
              <Td>
                {relation.type !== "morphTo" && (
                  <RelationProvider
                    {...relation}
                    modelIndex={modelIndex}
                    relationIndex={i}
                  >
                    <RelationSetting />
                  </RelationProvider>
                )}
              </Td>
              <Td>
                <IconButton
                  size="sm"
                  colorScheme="red"
                  onClick={() => remove(i)}
                  aria-label="Trash field"
                  icon={<Icon name="trash" />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
