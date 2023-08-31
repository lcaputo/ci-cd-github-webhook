# ci-cd-github-webhook

1) Generate a key with this command
```sh
ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'
```

2) Create github webhook in repository settings
```
Payload URL: http://<your-server-ip>:8181/webhook/

Content Type: application/json

Secret: key generated in before point
```

3) Install dependencies and run with npm
```sh
npm isntall

npm run start
```