import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Textarea } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { useForm } from "../../Context/FormFetch"

function FormFeedback ({ feedback, error }) {
    if (error) return  <FormErrorMessage>{ error }</FormErrorMessage>
    if (feedback) return <FormHelperText>{feedback}</FormHelperText>
    return null
}

function InputField ({ name, error, children, id = name, feedback = '', required = false , ...props }) {

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            { children && <FormLabel htmlFor={id}>{ children }</FormLabel> }
            <Input name={name} id={id} {...props} />
            <FormFeedback feedback={feedback} error={error}/>
        </FormControl>
    )
}
function TextareaField ({ name, error, children, id = name, feedback = '', required = false , ...props }) {

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            { children && <FormLabel htmlFor={id}>{ children }</FormLabel> }
            <Textarea name={name} id={id} {...props} />
            <FormFeedback feedback={feedback} error={error}/>
        </FormControl>
    )
}

function SelectField ({ name, error, children, id = name, feedback = '', options = [], required = false , ...props }) {

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            { children && <FormLabel htmlFor={id}>{ children }</FormLabel> }
            <Select name={name} id={id} {...props}>
                { options.map(({ label, value }) => <option key={value} value={value}>{ label }</option>) }
            </Select>
            <FormFeedback feedback={feedback} error={error}/>
        </FormControl>
    )
}

export function FormField ({ name, children, type = 'text', ...props }) {
    const { errors, getValue, setValue } = useForm()
    const value = getValue(name)
    const onChange = useCallback((e) => {
        setValue(name, e.target.value)
    }, [])

    const FieldComponent = useMemo (() => {
        switch (type) {
          case "textarea":
            return TextareaField;
          case "select":
            return SelectField;
          default:
            return InputField;
        }
      }, [type]);

 
    return (
        <FieldComponent
            name={name}
            value={value}
            onChange={onChange}
            error={errors[name] || null}
            {...props}
        >{ children }</FieldComponent>
    )
}