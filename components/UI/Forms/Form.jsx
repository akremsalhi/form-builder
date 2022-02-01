import { useContext, useMemo, useRef, useState, useEffect } from "react";
import { classNames } from "../../../helpers/functions/dom";
import { useAutofocus } from "../../../helpers/functions/hooks";
import { FormContext, useForm } from "../../Context/FormFetch";
import { DatePicker } from "../lib/DatePicker";
import { Loader } from "../Loader";

function Field({
  name,
  value,
  error,
  children,
  type = "text",
  className = '',
  required = false,
  feedback = '',
  setValue = () => {},
  ...props
}) {
  const [dirty, setDirty] = useState(false);
  const ref = useRef(null);
  useAutofocus(ref, props.autoFocus);
  const showError = error && !dirty;

  if (showError) {
    className += " is-invalid";
  }

  const FieldComponent = useMemo(() => {
    switch (type) {
      case "textarea":
        return FieldTextarea;
      case "select":
        return FieldSelect;
      case "datepicker":
        return DatePicker;
      default:
        return FieldInput;
    }
  }, [type]);
  
  useEffect(() => {
    setDirty(false)
  }, [error])
  function handleChange(e) {
    
    if (dirty === false) {
      setDirty(true);
    }

    if (!e?.target) {
      setValue(name, e)
      return
    }
    
    if(e.target.type === 'checkbox') {
      setValue(name, e.target.checked)
      return
    }
    setValue(name, e.target.value)
    
  }

  let attr = {
    name,
    id: name,
    className: classNames('form-control', type === 'datepicker' && 'pl-10', ...className.trim().split(' ')),
    onChange: handleChange,
    type,
    setValue,
    ...(value === undefined ? {} : { value }),
    ...props,
  };

  
  if (type === 'switch') {
    attr = {
      ...attr,
      className: classNames('form-check-input', ...className.trim().split(' ')),
      onChange: handleChange,
      type: 'checkbox',
      checked: !!value,
    }
    return (
      <div className='form-group'>

        { children && <label className='form-check-label' htmlFor={switchAttrs.id}>{ children }</label> }
        <div className="form-switch">
          <FieldComponent {...switchAttrs} />
        </div>
    </div>
    )
  }

  return (
    <div className="form-group" ref={ref}>
      {children && (
        <label htmlFor={name} className={classNames('form-label', !required && 'mb-1')}>
          {children}
          {required && <span className="is-required">*</span>}
        </label>
      )}

      <FieldComponent {...attr} />
      <span className="form-feedback">{feedback}</span>
    </div>
  );
}

export function FormField({ name, children, type = "text", ...props }) {
  const { errors, loading, emptyError, getValue, setValue } = useForm();

  const error = errors[name] || null;
  const value = getValue(name)

  return (
    <Field
      type={type}
      name={name}
      value={value}
      error={error}
      setValue={setValue}
      onInput={() => emptyError(name)}
      readOnly={loading}
      {...props}
    >
      {children}
    </Field>
  );
}

function FieldTextarea(props) {
  return <textarea {...props} />;
}

function FieldInput(props) {
  return <input {...props} />;
}

function FieldSelect({ options = [], placeholder = undefined, ...props }) {
  return <select {...props}>
    { placeholder && <option value=''>{ placeholder }</option> }
    { options.map((option) => <option key={option.value} value={option.value}>{ option.label }</option>) }
  </select>
}

export function FormPrimaryButton({ children, ...props }) {
  const { loading, errors } = useContext(FormContext);
  const disabled = loading || Object.keys(errors).length > 0;

  return (
    <PrimaryButton loading={loading} disabled={disabled} {...props}>
      {children}
    </PrimaryButton>
  );
}

export function Button({
  children,
  type = "button",
  className = "",
  loading = false,
  leftIcon = null,
  rightIcon = null,
  ...props
}) {
  return (
    <button className={classNames('btn', ...className.trim().split(' '), 'inline-flex', 'items-center', 'space-x-2')} type={type} disabled={loading} {...props}>
      {loading ? <Loader className="text-white" borderWidth={2} /> : leftIcon && leftIcon}
      {children && children}
      {rightIcon && rightIcon}
    </button>
  );
}

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <Button className={classNames('btn-primary', ...className.trim().split(' '))} {...props}>
      {children}
    </Button>
  );
}

export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <Button className={classNames('btn-secondary', ...className.trim().split(' '))} {...props}>
      {children}
    </Button>
  );
}

export function DangerButton({ children, className = '', ...props }) {
  return (
    <Button className={classNames('btn-danger', ...className.trim().split(' '))} {...props}>
      {children}
    </Button>
  );
}
