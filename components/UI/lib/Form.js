import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Switch, Textarea } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { useForm } from "../../Context/FormFetch"

function FormFeedback({ feedback, error }) {
    if (error) return <FormErrorMessage>{error}</FormErrorMessage>
    if (feedback) return <FormHelperText className="h-2">{feedback}</FormHelperText>
    return null
}

function InputField({ name, error, children, id = name, feedback = '', required = false, ...props }) {

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            {children && <FormLabel htmlFor={id}>{children}</FormLabel>}
            <Input name={name} id={id} {...props} />
            <FormFeedback feedback={feedback} error={error} />
        </FormControl>
    )
}
function TextareaField({ name, error, children, id = name, feedback = '', required = false, ...props }) {

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            {children && <FormLabel htmlFor={id}>{children}</FormLabel>}
            <Textarea name={name} id={id} {...props} />
            <FormFeedback feedback={feedback} error={error} />
        </FormControl>
    )
}
function SwitchField({ name, error, children, id = name, feedback = '', required = false, ...props }) {

    return (
        // <FormControl isInvalid={!!error} isRequired={required}>
        //     { children && <FormLabel htmlFor={id}>{ children }</FormLabel> }
        //     <Switch  name={name} id={id} {...props} />
        //     <FormFeedback feedback={feedback} error={error}/>
        // </FormControl>
        <FormControl display='flex' alignItems='center'>
            {children && <FormLabel htmlFor={id} mb='0'>{children}</FormLabel>}
            <Switch name={name} isChecked={props.value} id={id} {...props} />
            <FormFeedback feedback={feedback} error={error} />
        </FormControl>
    )
}

function SelectField({ name, error, children, id = name, feedback = '', options = [], required = false, ...props }) {

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            {children && <FormLabel htmlFor={id}>{children}</FormLabel>}
            <Select name={name} id={id} {...props}>
                {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
            </Select>
            <FormFeedback feedback={feedback} error={error} />
        </FormControl>
    )
}

export function FormField({ name, children, type = 'text', ...props }) {
    const { errors, getValue, setValue } = useForm()
    const value = getValue(name)
    const onChange = useCallback((e) => {
        const { value, checked, type: inputType } = e.target

        const inputValue = inputType === 'checkbox' ? checked : value

        setValue(name, inputValue)
    }, [])

    const FieldComponent = useMemo(() => {
        switch (type) {
            case "textarea":
                return TextareaField;
            case "select":
                return SelectField;
            case "switch":
                return SwitchField;
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
        >{children}</FieldComponent>
    )
}