import { render, screen } from '@testing-library/react';
import React from 'react';
import JoinGameForm from '../../component/JoinGameForm';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('EditQuestionCard Component', () => {
  it('render success', () => {
    render(
      <BrowserRouter>
        <JoinGameForm quizId={'1'} />
      </BrowserRouter>
    );
    const sessionID = screen.getByText(/Session ID/i);
    expect(sessionID).toBeInTheDocument();
    const username = screen.getByText(/Username/i);
    expect(username).toBeInTheDocument();
  });
});
