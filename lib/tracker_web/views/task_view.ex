defmodule TrackerWeb.TaskView do
  use TrackerWeb, :view
  alias TrackerWeb.TaskView
  alias TrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      assignee_id: task.assignee_id,
      minutes_worked: task.minutes_worked,
      assignee: UserView.render("user.json", user: task.assignee)
    }
  end
end
