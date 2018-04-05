defmodule TrackerWeb.Router do
  use TrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :authorize_user
  end

  scope "/", TrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/signUp", PageController, :index
    get "/login", PageController, :index
    get "/tasks*anything", PageController, :index
  end

  def authorize_user(conn, params) do
    authorization_header_value = get_req_header(conn, "authorization")

    if (length(authorization_header_value) > 0) do
      signingKey = Application.get_env(:tracker, :app_salt)

      authToken = String.replace(Enum.at(authorization_header_value, 0), "Bearer ", "")

      handle_user_auth(Phoenix.Token.verify(TrackerWeb.Endpoint, signingKey, authToken), conn)

    else
      conn
    end
  end

  defp handle_user_auth(result, conn) do
    case result do
      {:ok, user_id } ->
        IO.puts("User authenticated")
        assign(conn, :authenticated_user_id, user_id )
      {:error, reason } ->
        IO.puts("Error authenticating user")
        conn
        |> send_resp(:unauthorized, "Invalid token!")
    end
  end

  # Other scopes may use custom stacks.
   scope "/api/v1", TrackerWeb do
     pipe_through :api

     resources "/tasks", TaskController, except: [:new, :edit]
     resources "/users", UserController, except: [:new, :edit]
     resources "/timeblocks", TimeBlockController, except: [:new, :edit]
   end
end
