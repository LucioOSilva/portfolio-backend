// emailModel
const connection = require('./connection');

const addEmail = async (emailObject) => {
  const email = await connection()
    .then((db) => db.collection('emails').insertOne(emailObject, { writeConcern: { w: "majority" , wtimeout: 500 } }));
  return email;
};

const findAllEmails = async () => {
  const email = await connection()
    .then((db) => db.collection('emails').find().toArray());
  return email;
};

const findOneEmail = async (emailObject) => {
  const email = await connection()
    .then((db) => db.collection('emails').findOne(emailObject));
  return email;
};

const updateOneEmail = async (id, name, subject, message) => {
  const email = await connection()
    .then((db) => db.collection('emails').updateOne(
      { _id: id },
      { $set: { name, subject, message } },
      { upsert: true },
    ))
    .then(() => ({ _id: id, name, subject, message }));
  return email;
};

const deleteOneEmail = async (emailObject) => {
  const email = await findOneEmail(emailObject);
  if (!email) return { error: 'email not found' };
  await connection().then((db) => db.collection('emails').deleteOne(emailObject));
  return { success: 'email deleted' };
};

module.exports = {
  addEmail,
  findAllEmails,
  findOneEmail,
  updateOneEmail,
  deleteOneEmail,
};
