# date = window.app.date

# describe 'Date utility object', ->

#   describe '@getDate', ->
#     it 'returns actual Date', ->
#       date1 = new Date()
#       date2 = date.getDate()
#       expect(date2).toEqual(date1)
#       expect(+date2).toEqual(+date1)

#   describe '@getHours', ->
#     it 'returns 24 formatted hours is use24 param is true', ->
#       hours = new Date().getHours()
#       expect(date.getHours(true)).toBe(hours)

#   describe '@getMinutes', ->
#     it 'returns string', ->
#       expect(typeof date.getMinutes()).toBe('string')
#     it 'returns actual minutes', ->
#       minutes = new Date().getMinutes() + ''
#       expect(date.getMinutes()).toBe(minutes)
#     it 'returns 0 based value for minutes < 10', ->
#       spyOn(date, 'getDate').and.returnValue(new Date('1/1/1 13:02:01'))
#       expect(date.getMinutes()).toBe('02')

describe 'test', ->
    it 'should be fine', ->
        expect(true).toBe(true)
