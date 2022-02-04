import {
  Checkbox,
  FormControl,
  FormLabel, IconButton, Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Switch,
  useDisclosure
} from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "../../components/Context/FormFetch";
import Icon from "../../components/UI/Icon";
import { FormField } from "../../components/UI/lib/Form";
import { deepSet } from "../../helpers/functions/form";
import { relationships } from "../../values/values";

const TextInput = (props) => {


  return (
    <FormControl>
      <Input {...props} />
    </FormControl>
  );
};
const SwitchInput = (props) => {

  return (
    <FormControl className="flex" alignItems='center'>
      <Switch {...props} isChecked={props.value} />
      <FormLabel htmlFor='email-alerts' mb='0' ml='2'>
        {props.value ? 'Yes' : 'No'}
      </FormLabel>
    </FormControl>
  );
};

const FieldDefault = (props) => {
  const { type } = useContext(FieldContext)
  const DefaultField = useMemo(() => {
    switch (type) {
      case 'boolean':

        return SwitchInput

      default:
        return TextInput;
    }
  }, [type]);

  return <DefaultField {...props} />;
};

const FieldOptions = () => {
  const { setValue } = useForm()
  const { type, fieldIndex, modelIndex, options: defaultOptions } = useContext(FieldContext);

  const [options, setOptions] = useState(defaultOptions)

  const defaultOption = options.find(({ key }) => key === 'default')
  const [{ isUnique, isNullable, isDefault, defaultValue, isConstrained, onDelete, onUpdate }, setState] = useState({
    isUnique: options.some(({ key }) => key === "unique"),
    isNullable: options.some(({ key }) => key === "nullable"),
    isDefault: options.some(({ key, ...option }) => key === "default" && Array.isArray(option.arguments) && option.arguments.length > 0),
    defaultValue: defaultOption?.arguments[0] ?? null,
    isConstrained: options.some(({ key }) => key === "constrained"),
    onDelete: options.some(({ key }) => key === "onDelete"),
    onUpdate: options.some(({ key }) => key === "onUpdate"),

  })

  // console.log(defaultValue)

  useEffect(() => {
    // console.log(options)
  }, [options])

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    let option = { key: "", arguments: [] };
    const formattedValue =
      name === 'defaultValue'
        ? checked
        : type === "integer"
          ? parseInt(value, 10)
          : value;

    if (["defaultValue", "onDelete", "onUpdate"].includes(name)) {
      option.key = name === 'defaultValue' ? 'default' : name;
      deepSet(option, 'arguments.0', formattedValue)
    } else {
      option.key = name
    }


    const keys = {
      default: 'isDefault',
      defaultValue: 'defaultValue',
      constrained: 'isConstrained',
      unique: 'isUnique',
      nullable: 'isNullable',
      onDelete: 'onDelete',
      onUpdate: 'onUpdate',
    }

    if (name !== 'defaultValue') {
      if (!checked) {
        setOptions((prevOptions) => {
          const newOptions = prevOptions.filter(({ key }) => key !== name)
          setValue(`models.${modelIndex}.fields.${fieldIndex}.options`, newOptions)
          return newOptions
        })

      } else {
        setOptions((prevOptions) => {
          const newOptions = [...prevOptions, option]
          setValue(`models.${modelIndex}.fields.${fieldIndex}.options`, newOptions)
          return newOptions
        })

      }
    } else {
      setOptions((prevOptions) => {
        const newOptions = prevOptions.map((op) => op.key === 'default' ? { ...op, arguments: [checked] } : op)
        setValue(`models.${modelIndex}.fields.${fieldIndex}.options`, newOptions)
        return newOptions
      })

    }

    setState((prevState) => ({
      ...prevState,
      [keys[name]]: checked
    }))


  };


  return (
    <Stack gap={2}>
      <Checkbox
        value="unique"
        name="unique"
        onChange={handleChange}
        isChecked={isUnique}
      >
        Unique
      </Checkbox>
      <Checkbox
        value="nullable"
        name="nullable"
        onChange={handleChange}
        isChecked={isNullable}
      >
        Nullable
      </Checkbox>
      <Checkbox
        value="default"
        name="default"
        onChange={handleChange}
        isChecked={isDefault}
      >
        Default
      </Checkbox>
      {isDefault && <FieldDefault name='defaultValue' onChange={handleChange} value={defaultValue} />}


      {['foreignId'].includes(type) &&
        <>

          <Checkbox
            value="constrained"
            name="constrained"
            onChange={handleChange}
            isChecked={isConstrained}
          >
            Constrained
          </Checkbox>
          <Stack direction="row">
            <Checkbox
              value="cascade"
              name="onDelete"
              onChange={handleChange}
              isChecked={onDelete}
            >
              onDelete (cascade)
            </Checkbox>
            <Checkbox
              value="cascade"
              name="onUpdate"
              onChange={handleChange}
              isChecked={onUpdate}
            >
              onUpdate (cascade)
            </Checkbox>
          </Stack>
        </>
      }
    </Stack>
  );
};


const RelationOptions = () => {

  const { type, relationIndex, modelIndex } = useContext(RelationContext);

  const currentRelation = relationships.find(({ name }) => name === type)
  const relationArguments = currentRelation?.arguments ?? []

  return (
    <Stack gap={2}>
      {relationArguments.map((_, i) => <FormField key={i} name={`models.${modelIndex}.relationships.${relationIndex}.arguments.${i}`}>Relation Argument {i + 1}</FormField>)}
    </Stack>
  )
}

export const FieldSetting = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur
    >
      <PopoverTrigger>
        <IconButton size="sm" icon={<Icon name="three-dots" />} />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <FieldOptions />
      </PopoverContent>
    </Popover>
  );
};

export const RelationSetting = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur
    >
      <PopoverTrigger>
        <IconButton size="sm" icon={<Icon name="three-dots" />} />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <RelationOptions />
      </PopoverContent>
    </Popover>
  );
};

const FieldContext = React.createContext();

export const FieldProvider = ({ children, modelIndex, fieldIndex, type, ...field }) => {
  return (
    <FieldContext.Provider value={{ modelIndex, fieldIndex, type, ...field }}>
      {children}
    </FieldContext.Provider>
  );
};

const RelationContext = React.createContext();

export const RelationProvider = ({ children, modelIndex, relationIndex, ...relation }) => {
  return (
    <RelationContext.Provider value={{ modelIndex, relationIndex, ...relation }}>
      {children}
    </RelationContext.Provider>
  );
};