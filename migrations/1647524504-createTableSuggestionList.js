exports.up = async (sql) => {
  await sql`
	CREATE TABLE suggestion_list (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id integer REFERENCES users (id),
		description varchar(60)

	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE suggestion_list;
 `;
};
