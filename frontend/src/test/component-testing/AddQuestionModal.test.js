// Test Search Comp
import React from 'react';
import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
// import { Router } from 'react-router-dom';
import AddQuestionModal from '../../component/AddQuestionModal';
import { describe } from 'eslint/lib/rule-tester/rule-tester';

describe('Test AddQuestion component', () => {
  test('test AddQuestion component render', () => {
    const { container } = render(<AddQuestionModal />);
    container.querySelector('.AddEditQuestion_center_btn__3s2_d.modal-body');
    container.querySelector('.btn.btn-primary');
    container.querySelector(
      'AddEditQuestion_add_remove_input_box__2Vk-f.btn.btn-outline-danger'
    );
    container.querySelector(
      'AddEditQuestion_add_remove_input_box__2Vk-f btn btn-outline-primary'
    );
    container.querySelector('btn.btn-outline-success');
  });
});
