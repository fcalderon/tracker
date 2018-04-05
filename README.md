# Tracker

This is an SPA version of the Task Tracker application. This version only
includes minimal functionality to put in practice the principals of SPA app using
React and Redux.

## Design

The design of this app is very minimalistic. Counting only with the essentials, it's easy to use and navigate.

The user is able is able to perform the essential tasks:

* Sign up
* Sign in/out
* Create task and assign it to someone else of himself
* Update a task

## Starting/Deploying

To start your Phoenix server:

* Install dependencies with `mix deps.get`
* Create and migrate your database with `mix ecto.create && mix ecto.migrate`
* Install Node.js dependencies with `cd assets && npm install`
* Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

* Official website: http://www.phoenixframework.org/
* Guides: http://phoenixframework.org/docs/overview
* Docs: https://hexdocs.pm/phoenix
* Mailing list: http://groups.google.com/group/phoenix-talk
* Source: https://github.com/phoenixframework/phoenix

# Production Deployment

* Configure credentials under config/prod.secret.exs. There's an example file for your reference.
* For HTTPS, you can use Let's Encrypt and Certbot:

# Ubuntu

```
sudo apt-get update
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```

# Obtain cert

```
sudo certbot --nginx -d tracker-domain.com
```
