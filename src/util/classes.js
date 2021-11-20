const getInstructorString = (instructors, userData, def = '') => {
  let instString = '';
  if (!userData) return def;

  switch (instructors.length) {
  case 0:
    break;
  case 1:
    instString = (userData[instructors[0]] || {}).displayName;
    break;
  case 2:
    instString = instructors.map((id) => (userData[id] || {}).displayName)
      .join(' and ');
    break;
  default:
    instString = instructors.map((id) => (userData[id] || {}).displayName)
      .join(', ');
  }

  return instString;
};

module.exports = {
  getInstructorString,
};
