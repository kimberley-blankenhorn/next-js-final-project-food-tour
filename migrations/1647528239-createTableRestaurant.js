exports.up = async (sql) => {
  await sql`
	CREATE TABLE restaurant (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(30) NOT NULL,
		address varchar(90) NOT NULL,
		type varchar(30) NOT NULL,
		url varchar(90)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE restaurant;
 `;
};
