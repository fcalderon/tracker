defmodule TrackerWeb.TaskController do
  use TrackerWeb, :controller

  alias Tracker.Tasks
  alias Tracker.Tasks.Task

  action_fallback TrackerWeb.FallbackController

  def index(conn, _params) do
#    IO.inspect(conn)
#    IO.inspect(Map.get(conn, :assigns).authenticated_user_id)
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      IO.inspect(Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id))
      tasks = Tasks.list_tasks()
      render(conn, "index.json", tasks: tasks)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def create(conn, %{"task" => task_params}) do

    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", task_path(conn, :show, task))
        |> render("show.json", task: task)
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def show(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      task = Tasks.get_task!(id)
      render(conn, "show.json", task: task)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      task = Tasks.get_task!(id)

      with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
        render(conn, "show.json", task: task)
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def delete(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      task = Tasks.get_task!(id)
      with {:ok, %Task{}} <- Tasks.delete_task(task) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end
end
