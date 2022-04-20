import { render, screen } from '@testing-library/react';
import React from 'react';
import EditQuestionCard from '../../component/EditQuestionCard';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('EditQuestionCard Component', () => {
  it('render success', () => {
    render(
      <BrowserRouter>
        <EditQuestionCard />
      </BrowserRouter>
    );
    const editQuestion = screen.getByText(/Edit Questions/i);
    expect(editQuestion).toBeInTheDocument();
    const addQuestion = screen.getByText(/Add New Question/i);
    expect(addQuestion).toBeInTheDocument();
  });
});
