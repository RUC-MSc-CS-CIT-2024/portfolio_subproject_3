# portfolio_subproject_3

## How to run

```bash
docker compose up -d
```

The backend uses HTTPS, this requires you to trust a dev certificate which the backend uses for SSL. This can be done with the commands below:

> [!INFO]
> .NET 9 SDK or later is required on Unix systems (Mac & Linux)

```bash
mkdir $HOME/.aspnet/https
dotnet dev-certs https -ep $HOME/.aspnet/https/aspnetapp.pfx -p password --trust
```


### Update to latest version

When new version of either the database or backend is released you can update by shutting down the existing services and starting them again:

```bash
docker compose down
docker compose up -d
```

If you are running the development compose you can build new versions by using the `--build` flag:

```bash
docker compose -f ./compose.development.yaml down
docker compose -f ./compose.development.yaml up --build -d
```

### Release new versions 

You can build new image versions and push them to ghcr manually, see GitHub [documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) for detialed explanaiton.

