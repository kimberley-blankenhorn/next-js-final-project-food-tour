exports.up = async (sql) => {
  await sql`
		CREATE TABLE users (
			id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			first_name varchar(20) NOT NULL,
			last_name varchar(30) NOT NULL,
			username varchar(30) NOT NULL UNIQUE,
			email varchar(50) NOT NULL,
			password_hash varchar(75) NOT NULL,
			occupation varchar(60),
			age integer,
			about varchar(300),
			photo varchar(100)

		)`;
  // <insert magic here>
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE users`;
};
