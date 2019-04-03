import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({ name, placeholder, value, error, icon, type, onChange, isValid }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control', {
          'is-invalid': error,
          'is-valid': isValid
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      { error && <div className="invalid-feedback">{error}</div> }
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: 'text',
  isValid: false
};

export default InputGroup;
