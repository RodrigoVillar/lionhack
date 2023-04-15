import React from 'react';
import { useForm } from 'react-hook-form';

const InputForm = ({ onSendMessage }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onSendMessage(data.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="message" // Ensure the name attribute is a string
        placeholder="Type your message here..."
        {...register('test', { required : true })}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default InputForm;
