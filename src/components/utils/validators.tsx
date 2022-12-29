import './validators.css';

export const requiredField = (value: string): string | undefined => {
  if (value) return undefined;
  return 'Field is required';
};

export const Textarea = (props: any) => {
  return (
    <div className='errorBlock'>
      <textarea
        className={props.meta.error && props.meta.touched ? 'error_border' : ''}
        placeholder={props.placeholder}
        {...props.input}
      />
      {props.meta.error && props.meta.touched ? <span className='error'>{props.meta.error}</span> : ''}
    </div>
  );
};
export const Input = (props: any) => {
  return (
    <div className='errorBlock'>
      <input
        className={props.meta.error && props.meta.touched ? 'error_border' : ''}
        placeholder={props.placeholder}
        {...props.input}
      />
      {props.meta.error && props.meta.touched ? <span className={'error'}>{props.meta.error}</span> : ''}
    </div>
  );
};
