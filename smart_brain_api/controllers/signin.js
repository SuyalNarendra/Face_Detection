
const handleSignin = (req,res,db,bcrypt)=>{
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
handleSignin : handleSignin
}