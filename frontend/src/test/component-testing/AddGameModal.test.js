// Test Search Comp
import React from 'react';
import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
// import { Router } from 'react-router-dom';
import AddGameModal from '../../component/AddGameModal';
import { describe } from 'eslint/lib/rule-tester/rule-tester';

// const mockListing = {
//   name: 'component test',
//   owner: 'component@gmail.com',
//   questions: [],
//   thumbnail: null,
//   active: null,
//   createdAt: '2022-04-18T02:47:19.063Z'
// };

describe('Test register component', () => {
  // test user list card show
  test('test AddGameModal component', () => {
    const { container } = render(<AddGameModal />);
    container.querySelector('.form-control');
    container.querySelector('.btn.btn-primary');
  });
});
