import React from 'react';
import renderer from 'react-test-renderer';

import Current from '../Current';


describe('Components > weather > Current', () => {
  it('should match snapshot', () => {
    const testData = {
      code: '1',
      date: '18 Jan 2018',
      temp: -273,
      text: 'test-text'
    };

    const testLocation = {
      city: 'TestCity'
    };

    const testTemperatureUnits = 'test-temp-unit';


    const component = renderer.create(
      <Current
        data={testData}
        location={testLocation}
        temperatureUnits={testTemperatureUnits} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
