import React from 'react';
import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
// import { Router } from 'react-router-dom';
import AddQuizModal from '../../component/AddQuizModal';
import { describe } from 'eslint/lib/rule-tester/rule-tester';

describe('Test AddQuizModal component', () => {
  // test create card shown
  test('test AddQuizModal component', () => {
    const { container } = render(<AddQuizModal />);
    container.querySelector('.form-control');
    container.querySelector('.btn.btn-primary');
  });
});
