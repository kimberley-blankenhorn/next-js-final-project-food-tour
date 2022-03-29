exports.up = async (sql) => {
  await sql`
	CREATE TABLE suggestion_list_restaurants (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		suggestion_list_id integer REFERENCES suggestion_list (id),
		restaurant_id integer REFERENCES restaurant (id)

	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE suggestion_list_restaurants;
 `;
};
