import React, { useCallback, useContext, useEffect, useState } from 'react'
import { jsonFetch } from '../../helpers/functions/api'
import { deepGet, deepSet } from '../../helpers/functions/form'
import { useArray } from '../../helpers/functions/hooks'


export const FormContext = React.createContext({
    errors: {},
    loading: false,
    emptyError: () => {},
    getValue: () => {},
    setValue: () => {},
})

export function useForm () {
    return useContext(FormContext)
}

export function FormFetch({
    data = {},
    children,
    className,
    action,
    method = 'POST',
}) {
    const [{ loading, errors, values }, setForm] = useState({
        loading: false,
        errors: {},
        values: data
    })
    
    const emptyError = name => {
        if (!errors[name]) return null
        const newErrors = { ...errors }
        delete newErrors[name]
        setForm(s => ({ ...s, errors: newErrors }))
    }

    const setValue = (name, value) => {
        setForm((form) => {
            const newForm = { ...form }
            deepSet(newForm.values, name, value)
            return  newForm
        })
    }

    const getValue = name => {
        const val = deepGet(values, name)
        return val || ''

    }

    const value = {
        getValue, setValue, emptyError, values, errors, loading
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setForm(prevForm => ({
            ...prevForm,
            loading: true
        }))
        try {
            await jsonFetch(action, {
                method,
                body: values
            })

        } catch (err) {

            setForm(prevForm => ({
                ...prevForm,
                errors: err?.data?.errors || {}
            }))
        } finally {

            setForm(prevForm => ({
                ...prevForm,
                loading: false
            }))
        }
    }

    return (
        <FormContext.Provider value={value}>
            <form className={className} onSubmit={handleSubmit}>
                { typeof children === 'function' ? children(value) : children }
            </form>
        </FormContext.Provider>
    )
}

const FormArrayContext = React.createContext()

export const useFieldArray = () => {
    return useContext(FormArrayContext)
}

export function FormArray ({ children, name }) {

    const { values, setValue } = useForm()
    const fieldArray = useArray(deepGet(values, name))

    useEffect(() => {
        setValue(name, fieldArray.array)
    }, [fieldArray.array])


    return (
        <FormArrayContext.Provider value={fieldArray}>
            { children }
        </FormArrayContext.Provider>
    )
}
