import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../../../App'

describe("Dashboard render Page", () => {
  it('renders the PetTable component', () => {
    const {getByText} = render(<App/>);
    expect(getByText(/pets/i)).toBeInTheDocument();
  });

  it('render petForm component', () => {
    const {getByText} = render(<App/>);
    expect(getByText("Add Pet")).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    const {getByText} = render(<App/>);
    expect(getByText("Submit")).toBeInTheDocument();
  });
});

describe("PetForm behaviour",  () => {

  it('should submit when form input contain text', async () => {
    const { getByTestId, queryByText } = render(<App/>)

    await act(async () => {
      const field = getByTestId('name').querySelector('input');
      // now fire your event
      fireEvent.change(field, { target: { value: 'Tiger' } });
    });

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    expect(queryByText("Name is required")).not.toBeInTheDocument();
  });

  it('validate name input and provides error messages', async () => {
    const { getByTestId, getByText } = render(<App/>)

    await act (async () => {
      const field = getByTestId('name').querySelector('input');
      // now fire your event
      fireEvent.change(field, { target: { value: '' } });
    });

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    expect(getByText("Name is required")).toBeInTheDocument();
  });

});

describe('Pet table', () => {
  it('adds pets to table', async () => {

    // mock window.fetch for the test
    const UserResponse = [{name: 'Dinosaur', id:200}]

    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(UserResponse),
      })
    });

    // Render the DashBoard component
    const { getByTestId } = render(<App />);

    // fill out the form
    await act (async () => {
      const field = getByTestId('name').querySelector('input');
      // now fire your event
      fireEvent.change(field, { target: { value: 'Dinosaur' } });
    });

    //Submit the form
    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    // Expect Dinosaur to be in table
    const {getByText} = render(<App/>);
    expect(getByText(/Dinosaur/i)).toBeInTheDocument();

  })
});







