defmodule TrackerWeb.UserController do
  use TrackerWeb, :controller

  alias Tracker.Users
  alias Tracker.Users.User

  action_fallback TrackerWeb.FallbackController

  def index(conn, _params) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      users = Users.list_users()
      render(conn, "index.json", users: users)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def create(conn, %{"credentials" => user_credentials}) do
    user = Users.authenticate(user_credentials["username"], user_credentials["password"])

    if (user == nil) do
      with {:unauthorized} do
        conn
        |>put_status(:unauthorized)
        |>render("error.json", message: "Invalid credentials")
      end
    else
      token = Phoenix.Token.sign(TrackerWeb.Endpoint, Application.get_env(:tracker, :app_salt), user.id)
      render(conn, "authentication.json", user: user, token: token)
    end
  end

  def show(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      user = Users.get_user!(id)
      render(conn, "show.json", user: user)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      user = Users.get_user!(id)

      with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
        render(conn, "show.json", user: user)
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def delete(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      user = Users.get_user!(id)
      with {:ok, %User{}} <- Users.delete_user(user) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end
end
