defmodule Tracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :description, :string
      add :minutes_worked, :integer, null: false
      add :completed, :boolean, default: false, null: false
      add :created_by_id, references(:users, on_delete: :nothing)
      add :assignee_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:tasks, [:created_by_id])
    create index(:tasks, [:assignee_id])
  end
end
