import React from 'react';
import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
// import { Router } from 'react-router-dom';
import AddGameModal from '../../component/AddGameModal';
import { describe } from 'eslint/lib/rule-tester/rule-tester';

describe('Test AddGameModal component', () => {
  // test create card shown
  test('test addGameModal component', () => {
    const { container } = render(<AddGameModal />);
    container.querySelector('.form-control');
    container.querySelector('.btn.btn-primary');
  });
});
