defmodule Tracker.Repo.Migrations.CreateTimeBlocks do
  use Ecto.Migration

  def change do
    create table(:time_blocks) do
      add :start_time, :naive_datetime
      add :end_time, :naive_datetime
      add :created_by_id, references(:users, on_delete: :nothing)
      add :task_id, references(:tasks, on_delete: :nothing)

      timestamps()
    end

    create index(:time_blocks, [:created_by_id])
    create index(:time_blocks, [:task_id])
  end
end
