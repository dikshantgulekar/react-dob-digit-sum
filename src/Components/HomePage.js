import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [submittedData, setSubmittedData] = useState({ name: '', dob: '' });

  const calculateSingleDigit = (dateStr) => {
    const digits = dateStr.replace(/\D/g, '');
    let sum = digits.split('').reduce((acc, val) => acc + parseInt(val), 0);

    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
    }

    return sum;
  };

  const onSubmit = (data) => {
    const finalDigit = calculateSingleDigit(data.dob);
    setResult(finalDigit);
    setSubmittedData({ name: data.name, dob: data.dob });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Date of Birth Digit Sum</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  {...register('name', {
                    required: 'Name is required.',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters.'
                    }
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              {/* DOB Field */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                  id="dob"
                  {...register('dob', { required: 'Date of birth is required.' })}
                />
                {errors.dob && (
                  <div className="invalid-feedback">{errors.dob.message}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">Calculate</button>
            </form>

            {result !== null && (
              <div className="alert alert-success mt-4 text-center">
                <p><strong>Name:</strong> {submittedData.name}</p>
                <p><strong>Date of Birth:</strong> {submittedData.dob}</p>
                <p><strong>Final Single Digit:</strong> {result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
