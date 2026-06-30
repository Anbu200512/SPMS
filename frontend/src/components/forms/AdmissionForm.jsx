import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { showSuccess, showError } from '../ui/Toast';
import Button from '../ui/Button';

const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const nextStep = async () => {
    const fieldsToValidate = step === 1 ? ['studentName', 'dob', 'gender', 'class'] : ['parentName', 'parentEmail', 'parentPhone'];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/admissions', data);
      showSuccess('Application submitted successfully! We will contact you soon.');
      setStep(1);
    } catch (err) {
      showError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                step >= s ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div className={`w-12 sm:w-20 h-1 mx-2 rounded transition-colors ${step > s ? 'bg-primary-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Student Details</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Name *</label>
              <input
                type="text"
                {...register('studentName', { required: 'Student name is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.studentName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Full name"
              />
              {errors.studentName && <p className="mt-1 text-sm text-red-500">{errors.studentName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
              <input
                type="date"
                {...register('dob', { required: 'Date of birth is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.dob ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender *</label>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                  errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Applying For *</label>
              <select
                {...register('class', { required: 'Class is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                  errors.class ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select class</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                ))}
              </select>
              {errors.class && <p className="mt-1 text-sm text-red-500">{errors.class.message}</p>}
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="button" variant="primary" onClick={nextStep}>Next Step</Button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Parent / Guardian Details</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Parent Name *</label>
              <input
                type="text"
                {...register('parentName', { required: 'Parent name is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.parentName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Full name"
              />
              {errors.parentName && <p className="mt-1 text-sm text-red-500">{errors.parentName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Relationship *</label>
              <select
                {...register('relationship', { required: 'Relationship is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
                  errors.relationship ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select relationship</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
              </select>
              {errors.relationship && <p className="mt-1 text-sm text-red-500">{errors.relationship.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <input
                type="email"
                {...register('parentEmail', { required: 'Email is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.parentEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="email@example.com"
              />
              {errors.parentEmail && <p className="mt-1 text-sm text-red-500">{errors.parentEmail.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
              <input
                type="tel"
                {...register('parentPhone', { required: 'Phone is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.parentPhone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Phone number"
              />
              {errors.parentPhone && <p className="mt-1 text-sm text-red-500">{errors.parentPhone.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <textarea
              {...register('address')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Full address"
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
            <Button type="button" variant="primary" onClick={nextStep}>Next Step</Button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Additional Information</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous School</label>
              <input
                type="text"
                {...register('previousSchool')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Previous school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Academic Year</label>
              <select
                {...register('academicYear')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Medical Information</label>
            <textarea
              {...register('medicalInfo')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Any medical conditions or allergies"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Documents</label>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-500 text-sm mb-2">Upload documents here</p>
              <input type="file" multiple className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
            <Button type="submit" variant="accent" loading={loading}>Submit Application</Button>
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default AdmissionForm;
