defmodule TrackerWeb.UserView do
  use TrackerWeb, :view
  alias TrackerWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      username: user.username}
  end

  def render("authentication.json", %{user: user, token: token}) do
    %{
      user: render("user.json",  user: user),
      token: token
    }
  end


  def render("error.json", %{message: message}) do
    %{
      error: message
    }
    end
end
