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
import { fieldDefault, htmlTypes, migrationTypes } from "../../values/values";
import { FieldProvider, FieldSetting } from "../partials/model";

export default function FormFields({ modelIndex }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-xl font-medium">Fields</h3>

      <FormArray name={`models.${modelIndex}.fields`}>
        <ModelFields modelIndex={modelIndex} />
      </FormArray>
    </div>
  );
}

const ModelFields = ({ modelIndex }) => {
  const { array: fields, push, remove } = useFieldArray();

  return (
    <>
      <Box>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Icon name="plus" size="20" />}
          onClick={() => push(fieldDefault)}
        >
          Field
        </Button>
      </Box>
      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Migration Type</Th>
            <Th>HTML Type</Th>
            <Th>Options</Th>
            <Th>_</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fields.map((field, i) => (
            <Tr key={i}>
              <Td>
                <FormField
                  name={`models.${modelIndex}.fields.${i}.name`}
                ></FormField>
              </Td>
              <Td>
                <FormField
                  name={`models.${modelIndex}.fields.${i}.type`}
                  type="select"
                  options={migrationTypes.map((t) => ({
                    label: t,
                    value: t,
                  }))}
                ></FormField>
              </Td>
              <Td>
                <FormField
                  name={`models.${modelIndex}.fields.${i}.htmlType`}
                  type="select"
                  options={htmlTypes.map((t) => ({
                    label: t,
                    value: t,
                  }))}
                ></FormField>
              </Td>
              <Td>
                <FieldProvider
                  {...field}
                  modelIndex={modelIndex}
                  fieldIndex={i}
                >
                  <FieldSetting />
                </FieldProvider>
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
