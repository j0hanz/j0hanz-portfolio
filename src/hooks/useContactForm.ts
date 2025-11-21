import { ChangeEvent, FormEvent, useReducer } from 'react';

import { SEND_ERROR_MESSAGE } from '@/config/constants';
import {
  ContactFormErrors,
  ContactFormValues,
  FieldName,
} from '@/config/types';
import { useSnackbar } from '@/hooks';
import { sendEmail } from '@/lib/emailJs';
import { validateForm } from '@/utils/validation';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  url: '',
  message: '',
};

type FormState = {
  values: ContactFormValues;
  errors: ContactFormErrors;
  status: 'idle' | 'submitting' | 'success' | 'error';
};

type FormAction =
  | { type: 'CHANGE'; field: FieldName; value: string }
  | { type: 'SET_ERRORS'; errors: ContactFormErrors }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR' }
  | { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        // Clear error for the field being changed
        errors: { ...state.errors, [action.field]: undefined },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_START':
      return { ...state, status: 'submitting', errors: {} };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success', values: INITIAL_VALUES };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error' };
    case 'RESET':
      return { values: INITIAL_VALUES, errors: {}, status: 'idle' };
    default:
      return state;
  }
};

const useContactForm = () => {
  const { showSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(formReducer, {
    values: INITIAL_VALUES,
    errors: {},
    status: 'idle',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', field: name as FieldName, value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm(state.values);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    try {
      const success = await sendEmail(state.values);
      if (success) {
        dispatch({ type: 'SUBMIT_SUCCESS' });
        showSnackbar('Your message was sent successfully!', 'success');

        // Auto-reset after delay
        setTimeout(() => {
          dispatch({ type: 'RESET' });
        }, 3200);
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      dispatch({ type: 'SUBMIT_ERROR' });
      showSnackbar(SEND_ERROR_MESSAGE, 'error');
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    formData: state.values,
    errors: state.errors,
    status: state.status,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useContactForm;
