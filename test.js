import test from 'ava';
const axios = require('axios');


test('formulaire is detected', async t => {
  	const result =  await axios.get('https://limitless-plateau-96293.herokuapp.com')
    try {
      if (result.data.toString().includes("form")) {
        t.pass();
      } else {
        t.fail("Formulaire Existe");
      }
    } catch (e) {
        t.fail("Un Probleme de formulaire");
    }
  });

test('replay is valide', async t => {
  const result = await axios.post('https://limitless-plateau-96293.herokuapp.com/ville', {nom_ville:"Paris"});
  try {
  	console.log(result.data.toString().includes("Paris"))
    t.is(result.data.toString().includes("Paris"), true);
  } catch (e) {
      t.fail("Dommage mais cette ville n'existe pas");
  }
    });