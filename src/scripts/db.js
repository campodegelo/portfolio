// CONSTANT DECLARATIONS
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/fernandaeisfeld"
);

// EXPORTED FUNCTIONS

// if user is already registered, it will return its password to be compared
exports.userExists = emailToCheck => {
    return db
      .query(`SELECT * FROM users WHERE email = $1`, [emailToCheck])
      .then(({ rows }) => rows);
};

// UPDATE PICTURE
exports.updatePicture = (id, imageUrl) => {
    return db
        .query(
            `UPDATE users
            SET image=$2
            WHERE id=$1
            RETURNING image`,
            [id, imageUrl]
        )
        .then(({ rows }) => rows);
  };

// SELECT INFORMATION ABOUT USER
exports.getUserInfo = id => {
    return db
      .query(
        `SELECT id, first, last, image, description FROM users
              WHERE id=$1`,
        [id]
      )
      .then(({ rows }) => rows);
  };
  
// INSERT a new user in the table users
exports.insertNewUser = (first, last, email, password) => {
  return db
    .query(
      `INSERT INTO users (first, last, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
      [first, last, email, password]
    )
    .then(({ rows }) => rows);
};

// if user is already registered, it will return its password to be compared
exports.userExists = emailToCheck => {
    return db
      .query(`SELECT * FROM users WHERE email = $1`, [emailToCheck])
      .then(({ rows }) => rows);
  };

// update the user information
exports.updateAbout = (id, first, last, description) => {
    return db.query(`
        UPDATE users
        SET first=$2, last=$3, description=$4
        WHERE id=$1
        RETURNING id`,
        [id, first, last, description]
        ).then(({rows}) => rows);
}

