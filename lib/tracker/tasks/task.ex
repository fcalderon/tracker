defmodule Tracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :title, :string
    field :minutes_worked, :integer
    field :created_by_id, :id
    field :assignee_id, :id
    belongs_to :assignee, Tracker.Users.User, references: :id, define_field: false

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :assignee_id, :minutes_worked])
    |> validate_required([:title, :description, :completed, :assignee_id])
  end
end
