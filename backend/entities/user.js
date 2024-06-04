import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    email: {
      type: String,
      unique: true,
    },
    pseudo: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    password: {
      type: String,
    },
  },
});

export default User;
