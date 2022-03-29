exports.up = async (sql) => {
  await sql`
	CREATE TABLE favorites (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id integer REFERENCES users (id),
		suggestion_list_id integer REFERENCES suggestion_list (id)

	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE favorites;
 `;
};
