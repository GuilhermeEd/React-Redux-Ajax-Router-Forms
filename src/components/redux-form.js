import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { submitForm } from '../actions';

class ReduxForm extends Component{

    onSubmit(values){
        this.props.submitForm(values);
    }

    renderField(field){
        const { meta: { touched, error }, input: { name, label } } = field;
        const className = `form-group ${ touched && error ? 'has-danger' : '' }`

        return(
            <div className={className}>
                <label>{label || name.charAt(0).toUpperCase() + name.slice(1)}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="form-control-feedback">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="My Title"
                    name="title"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values){
    const errors = {};

    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters long!";
    }

    return errors;
}

export default reduxForm({
    validate, 
    form: 'FormName'
})(
    connect(null, { submitForm })(ReduxForm)
);