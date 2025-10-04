CREATE SEQUENCE user_id_seq CACHE 100;
CREATE TABLE users (
  id BIGINT PRIMARY KEY DEFAULT nextval('user_id_seq'),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE SEQUENCE recipes_id_seq CACHE 100;
CREATE TABLE recipes (
  id BIGINT PRIMARY KEY DEFAULT nextval('recipes_id_seq'),
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes (created_at);

CREATE SEQUENCE ingredients_id_seq CACHE 100;
CREATE TABLE ingredients (
  id BIGINT PRIMARY KEY DEFAULT  nextval('ingredients_id_seq'),
  recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  amount VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);


CREATE SEQUENCE instructions_id_seq CACHE 100;
CREATE TABLE instructions (
  id BIGINT PRIMARY KEY DEFAULT nextval('instructions_id_seq'),
  recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,

  text TEXT NOT NULL,
  CONSTRAINT uniq_step_per_recipe UNIQUE (recipe_id, step_number)
);

CREATE INDEX idx_recipe_user_id ON recipes(user_id);
CREATE INDEX idx_ingredients_recipe_id ON ingredients(recipe_id);
CREATE INDEX idx_instructions_recipe_id ON instructions(recipe_id);
