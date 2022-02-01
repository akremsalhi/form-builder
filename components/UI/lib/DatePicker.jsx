import React, { useCallback, useEffect, useRef } from 'react'

import "flatpickr/dist/themes/airbnb.css";
import Icon from '../Icon'
import flatpickr from "flatpickr";

export const DatePicker = React.forwardRef(({ value, altInput = true, enableTime = false, setValue, ...props }, ref) => {

  const inputRef = useRef()
  const flatpickrRef = useRef()
  const onChangeRef = useRef(setValue)
  onChangeRef.current = setValue

  const handleChange = useCallback((dates, date) => {
    onChangeRef.current(props.name, date)
  }, [])
  
  useEffect(() => {
    if (inputRef.current) {
      const f = flatpickr(inputRef.current, {
      
        altFormat: enableTime ? 'd F Y H:i' : 'd F Y',
        dateFormat: enableTime ? 'Y-m-d H:i:s' : 'Y-m-d',
        altInput,
        enableTime,
        clickOpens: !props.readOnly,
        onChange: handleChange,
        ...props,
      })
      flatpickrRef.current = f
      return () => f.destroy()

    }
  }, [inputRef.current])

  useEffect(() => {
    flatpickrRef.current.setDate(value, false)
  }, [setValue])
  
  return (
      
    <div className="relative">
      <input { ...props } ref={inputRef} />
      <Icon name="calendar" size="24" className="input-icon" htmlFor="flatpicker-calendar" />
    </div>
  )
})