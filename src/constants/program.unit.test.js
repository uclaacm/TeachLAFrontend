import Program from './Program'

let retVal = {
  code: "console.log('Hello World')",
  creationDate: new Date('July 17, 2015 03:24:00'),
  lastModified: new Date('August 23, 2017 04:05:10'),
  title: "My Amazing JS Sketch",
  valid: true,
}

let doc = {
  exists: true,
  data: function(){},
}

doc.data = jest.fn().mockReturnValue(retVal)

test("Program takes in the correct values from a firestore document.", () => {
  let prog = new Program(doc)
  expect(prog).toMatchObject(retVal)
  expect(prog).toHaveProperty("valid", true)
})
