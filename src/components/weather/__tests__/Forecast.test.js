import renderer from 'react-test-renderer';

import Forecast, { daysBetween, getDay } from '../Forecast';

describe('Components > weather > Forecast', () => {
  const mockToday = (today, fn) => {
    /* global global */
    const OriginalDate = Date;
    // mock Date
    global.Date = jest.fn().mockImplementation((a) => new OriginalDate(a ? a : today));
    global.Date.now = OriginalDate.now;
    // run function
    fn();
    // restore mocked Date
    global.Date = OriginalDate;
  };

  it('should match snapshot', () => {
    const testData = [
      { code: '1', date: '30 Jan 2018', day: 'Tue', max: 10, min: 5, text: 'test1' },
      { code: '3', date: '18 Jan 2018', day: 'Wed', max: 9, min: 3, text: 'test2' },
      { code: '5', date: '19 Jan 2018', day: 'Thu', max: -100, min: 500, text: 'test3' },
      { code: '2', date: '2 Feb 2018', day: 'Fri', max: 100, min: -273, text: 'test4' },
      { code: '18', date: '3 Feb 2018', day: 'Sat', max: 10, min: 5, text: 'test5' },
    ];
    mockToday('18 Jan 2018', () => {
      const component = renderer.create(<Forecast data={testData} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('daysBetween', () => {
    it('should return days between two dates', () => {
      expect(daysBetween('18 Jan 2018', '18 Jan 2018')).toEqual(0);
      expect(daysBetween('18 Jan 2018', '19 Jan 2018')).toEqual(1);
      expect(daysBetween('18 Jan 2018', '20 Jan 2018')).toEqual(2);
      expect(daysBetween('18 Jan 2018', '17 Jan 2018')).toEqual(-1);
      expect(daysBetween('18 Jan 2018', '18 Feb 2018')).toEqual(31);
      expect(daysBetween('18 Feb 2018', '18 Mar 2018')).toEqual(28);
    });
  });

  describe('getDay', () => {
    it('should return day name for date', () => {
      mockToday('18 Jan 2018', () => {
        expect(getDay('17 Jan 2018')).toEqual('Day3');
        expect(getDay('18 Jan 2018')).toEqual('Today');
        expect(getDay('19 Jan 2018')).toEqual('Tomorrow');
        expect(getDay('20 Jan 2018')).toEqual('Day6');
        expect(getDay('21 Jan 2018')).toEqual('Day0');
      });
    });
  });
});
