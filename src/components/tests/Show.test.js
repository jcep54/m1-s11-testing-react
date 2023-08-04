import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';


test('renders without errors', () => {
    render(<Show show={showData} selectedSeason={'none'}/>)
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={'none'}/>)
    const loading = screen.getByTestId('loading-container')
    expect(loading).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={showData} selectedSeason={'none'}/>)
    const seasons = screen.queryAllByTestId('season-option')
    expect(seasons).toHaveLength(2)
 });

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={showData} selectedSeason={'none'} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText(/Select A Season/i)
    console.log('my log',select)
    
    fireEvent.change(select, { target: { value: 2 } })

    expect(handleSelect).toBeCalled();


 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () =>{ 
    const { rerender } = render(<Show show={showData} selectedSeason={'none'}/>);
    let episodes = screen.queryByTestId('episodes-container')
    expect(episodes).not.toBeInTheDocument()

    rerender(<Show show={showData} selectedSeason={1}/>)
    episodes = screen.queryByTestId('episodes-container')
    expect(episodes).toBeInTheDocument()
});


const showData = {
    name: 'strange',
    summary: 'its a good show man',
    seasons: [
            {
            id:1,
            name: 'worst one',
            episodes:[]
            },
            {
            id:2,
            name: 'best one',
            episodes:[]
            }
    ]
}