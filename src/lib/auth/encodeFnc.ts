import bcrypt from 'bcrypt';

const saltBounds = 10;
function encodeFnc(value: string) {
  const salt = bcrypt.genSaltSync(saltBounds);
  const hash = bcrypt.hashSync(value, salt);

  return hash;
}

export default encodeFnc;
