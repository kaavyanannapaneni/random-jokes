## Tech

- Prerequisite [Node JS](https://nodejs.org/en)
- [React-19.2.3](https://react.dev/)
- [Tanstack / React Query](https://tanstack.com/)
- API   
```
https://official-joke-api.appspot.com/jokes/${type}/random
```

## Installation

1. Clone the repo

```bash
git clone <repo>
```

2. Navigate to folder

```bash
cd <project-folder>
```

3. Install dependencies

```bash
npm install
```

4. Start the dev server

```bash
npm start
```

5. Access the application on a browser

```
http://localhost:3000/
```

## Deploying using github pages 

1. Install gh-pages to create & publish to gh-pages branch
```
npm i gh-pages
```

2. In `package.json` add
```json
 "homepage": "https://<username>.github.io/<repo-name>/",

  "scripts": {
     "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
  },
```
3. To deploy
```bash
npm run build 
```

[Link](https://kaavyanannapaneni.github.io/random-jokes/)

