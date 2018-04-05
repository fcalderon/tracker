use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :tracker, TrackerWeb.Endpoint,
  secret_key_base: "<put_secret_key_bas_here>"

# Configure your database
config :tracker, Tracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "<put_postgres_username_here>",
  password: "<put_postgres_password_here>",
  database: "<pust_postgres_db_here>",
  pool_size: 15



# You can use pwgen for this key
# e.g. $ pwgen 32 1 -s -y
config :tracker, app_salt: "<put_secret_key_salt_here>"