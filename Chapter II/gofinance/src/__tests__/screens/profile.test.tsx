import React from 'react';
import { render } from '@testing-library/react-native';

import Profile from '../../screens/Profile';

test('check if show correctly user input name placeholder', () => {
  const { getByPlaceholderText } = render(<Profile />);

  const inputName = getByPlaceholderText('Nome');

  expect(inputName.props.placeholder).toBeTruthy();
});

test('check if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />);

  const inputName = getByTestId('input-name');
  const surnameName = getByTestId('input-surname');

  expect(inputName.props.value).toEqual('Saron');
  expect(surnameName.props.value).toEqual('Medeiros');
});

test('check if title render correctly', () => {
  const { getByTestId } = render(<Profile />);

  const textTitle = getByTestId('text-title');

  expect(textTitle.props.children).toContain('Perfil');
});